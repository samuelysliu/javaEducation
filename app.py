from datetime import timedelta
from flask import Flask, request, send_from_directory
import requests
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from control import userProfile, projectControl, commentControl, fileControl
import subprocess

load_dotenv()

app = Flask(__name__, static_folder='templates/build')
# CORS(app, resources={r"/api/.*": {"origins": [os.getenv("REACT_APP_APIPATH")]}})
# CORS(app, resources={r"/bsc/.*": {"origins": [os.getenv("REACT_APP_APIPATH")]}})
CORS(app, resources={r"/master/.*": {"origins": ["192.168.100.10"]}})
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config["JWT_SECRET_KEY"] = "gnidoCpetSeerht"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)
api = Api(app)


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')




class register(Resource):
    # user register
    def post(self):
        result = userProfile.register(request.get_json())
        return {"result": result}


class user(Resource):
    # get user profile
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return {"result": current_user}

    # user login
    def post(self):
        data = request.get_json()
        result = userProfile.login(data)
        if result == "failed":
            return {"result": result}
        else:
            access_token = create_access_token(
                identity={"userId": result["id"], "class": result["class"], "account": result["account"], "authority": result["authority"], "label": result["label"]})
            return {"result": result, "token": access_token}

    @jwt_required()
    def put(self):
        data = request.get_json()
        if data["type"] == 'password':
            result = userProfile.changePassword(data)
            return {"result": result}
        else:
            result = userProfile.chageLabel(data)
            return {"result": result}


class project(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        projectId = request.args.get("projectId")
        className = request.args.get("className")

        if projectId == None and className == None:
            result = projectControl.getAllProject()
        elif projectId != None:
            result = projectControl.getProjectById(projectId)
        elif className != None:
            result = projectControl.getProjectByClass(className)
        else:
            result = "failed"

        return {"result": result}

    def post(self):
        user = get_jwt_identity()
        if user["authority"] == "admin" or user["authority"] == "teacher":
            result = projectControl.saveProject(request.get_json())
        else:
            result = "failed"
        return {"result": result}

    def put(self):
        user = get_jwt_identity()
        if user["authority"] == "admin" or user["authority"] == "teacher":
            result = projectControl.updateProject(request.get_json())
        else:
            result = "failed"
        return {"result": result}

    def delete(self):
        user = get_jwt_identity()
        if user["authority"] == "admin" or user["authority"] == "teacher":
            projectId = request.args.get("projectId")
            result = projectControl.deleteProject(projectId)
        else:
            result = "failed"
        return {"result": result}

class comment(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        projectId = request.args.get("projectId")
        result = commentControl.getCommentByProject(projectId)
        return {"result": result}

    def post(self):
        data = request.get_json()
        user = get_jwt_identity()

        data["commentator"] = user["account"]

        result = commentControl.saveComment(data)
        return {"result": result}

class file(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        projectId = request.args.get("projectId")
        account = request.args.get("account")
        step = request.args.get("step")

        fileArray = fileControl.getFileByUserAndProject(projectId, account)

        for i in fileArray:
            if step == i["stepNum"]:
                return send_from_directory(i["filePath"], i["fileName"])
        return {"result": "failed"}

    def post(self):
        user = get_jwt_identity()
        file = request.files["file"]
        fileName = file.filename
        projectId = request.form["projectId"]
        account = user["account"]
        stepNum = request.form["stepNum"]

        result = fileControl.saveFile(file, fileName, projectId, account, stepNum)
        return {"result": result}

class compiler(Resource):
    def post(self):
        front = request.get_json()
        data = {
            "clientId": os.getenv("clientId_1"),
            "clientSecret": os.getenv("clientSecret_1"),
            "script": front["code"],
            "language": "java",
            "versionIndex": "3"
        }

        response = requests.post(url="https://stage.jdoodle.com/execute", json=data)
        print(response.text)
        return {"result": "success"}


api.add_resource(register, '/api/register')
api.add_resource(user, '/api/user')
api.add_resource(project, '/api/project')
api.add_resource(comment, '/api/comment')
api.add_resource(file, '/api/file')
api.add_resource(compiler, '/api/compiler')

if __name__ == '__main__':
    app.run()
