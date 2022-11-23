from datetime import timedelta
from flask import Flask, request, send_from_directory
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from control import userProfile, projectControl, commentControl, fileControl, javaCompiler, projectStudentControl, \
    groupControl, studentControl, completeSitulation

load_dotenv()

app = Flask(__name__, static_folder='templates/build')
# CORS(app, resources={r"/api/.*": {"origins": [os.getenv("REACT_APP_APIPATH")]}})
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
                identity={"userId": result["id"], "class": result["class"], "account": result["account"],
                          "authority": result["authority"], "label": result["label"], "groupName": result["groupName"]})
            return {"result": result, "token": access_token}

    @jwt_required()
    def put(self):
        data = request.get_json()
        user = get_jwt_identity()
        data["userId"] = user["userId"]
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
        className = request.args.get("class")

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
        commentator = request.args.get("commentator")
        owner = request.args.get("owner")

        if commentator == None:
            result = commentControl.getCommentByProject(projectId, owner)
        elif projectId == None:
            result = commentControl.getCommentByCommentator(commentator, owner)
        else:
            result = commentControl.getCommentByProjectAndCommentator(projectId, commentator)
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
        stepNum = request.args.get("stepNum")
        fileArray = fileControl.getFileByUserAndProject(projectId, account)

        if stepNum == None:
            return {"result": fileArray}

        for i in fileArray:
            if stepNum == i["stepNum"]:
                return {"result": i["code"]}
        return {"result": "failed"}

    def post(self):
        user = get_jwt_identity()
        account = user["account"]
        result = fileControl.saveFile(request.get_json(), account)
        projectStudentControl.saveRecord(request.get_json())
        return {"result": result}


class compiler(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def post(self):
        result = javaCompiler.compiler(request.get_json())
        return {"result": result}
        try:
            result = javaCompiler.compiler(request.get_json())
            return {"result": result}
        except:
            return {"result": "failed"}


class projectStudent(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        projectId = request.args.get("projectId")
        account = request.args.get("account")

        if projectId == None and account == None:
            return {"result": "failed"}
        elif projectId == None:
            result = projectStudentControl.getAllProjecyByStudent(account)
        else:
            result = projectStudentControl.getAllStudentByProject(projectId)

        return {"result": result}


class group(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        try:
            className = request.args.get("class")
            groupName = request.args.get("groupName")
            if groupName == None:
                result = groupControl.getGroupByClass(className)
            else:
                result = groupControl.getGroupByName(className, groupName)

            return {"result": result}
        except:
            return {"result": "failed"}

    def post(self):
        file = request.files["file"]
        className = request.form["class"]
        result = groupControl.grouping(file, className)
        return {"result": result}
        try:
            file = request.files["file"]
            className = request.form["class"]
            result = groupControl.grouping(file, className)
            return {"result": result}
        except:
            return {"result": "failed"}


class student(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        try:
            className = request.args.get("class")
            result = studentControl.getUserByClass(className)
            return {"result": result}
        except:
            return {"result": "failed"}


class completeSitulaion(Resource):
    @jwt_required()
    def __init__(self):
        return None

    def get(self):
        projectId = request.args.get("projectId")
        className = request.args.get("class")
        result = completeSitulation.getComplteByProject(projectId, className)
        print(result)
        return {"result": result}
        try:
            projectId = request.args.get("projectId")
            className = request.args.get("class")
            result = completeSitulation.getComplteByProject(projectId, className)
            return {"result": result}
        except:
            return {"result": "failed"}


api.add_resource(register, '/api/register')
api.add_resource(user, '/api/user')
api.add_resource(project, '/api/project')
api.add_resource(comment, '/api/comment')
api.add_resource(file, '/api/file')
api.add_resource(compiler, '/api/compiler')
api.add_resource(projectStudent, '/api/projectStudent')
api.add_resource(group, "/api/group")
api.add_resource(student, "/api/student")
api.add_resource(completeSitulaion, "/api/completeSitulation")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
