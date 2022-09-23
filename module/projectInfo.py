from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

class projectInfo:
    def __init__(self):
        self.col = dbInfo.project(self='')

    def saveProject(self, *args):
        try:
            result = self.col.insert_one(
                {"title": args[0]["title"], "class": args[0]["class"], "content": args[0]["content"], "step1": args[0]["step1"],
                 "step2": args[0]["step2"], "step3": args[0]["step3"], "totalStep": 3,
                 "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateProject(self, *args):
        try:
            self.col.update_one(args[0]["myquery"], args[0]["newValues"])
            return "success"
        except:
            return "failed"

    def deleteProject(self, *args):
        try:
            self.col.delete_one({"_id": ObjectId(args[0]["id"])})
            return "success"
        except:
            return "failed"

    def getAllProject(self):
        try:
            result = self.col.find()
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3})

            return projectArray

        except:
            return "failed"

    def getProjectById(self, *args):
        try:
            result = self.col.find({"_id": ObjectId(args[0]["id"])})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3}

        except:
            return "failed"

    def getProjectBytitle(self, *args):
        try:
            result = self.col.find({"title": args[0]["title"]})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3}

        except:
            return "failed"

    def getProjectByClass(self, *args):
        try:
            result = self.col.find({"class": args[0]["class"]})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3})

            return projectArray

        except:
            return "failed"
