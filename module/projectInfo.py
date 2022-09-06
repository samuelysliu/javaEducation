from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

col = dbInfo.project(self='')


class projectInfo:
    def saveProject(self):
        try:
            result = col.insert_one(
                {"title": self["title"], "class": self["class"], "content": self["content"], "step1": self["step1"],
                 "step2": self["step2"], "step3": self["step3"], "totalStep": 3,
                 "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateProject(self):
        try:
            col.update_one(self["myquery"], self["newValues"])
            return "success"
        except:
            return "failed"

    def deleteProject(self):
        try:
            col.delete_one({"_id": ObjectId(self["id"])})
            return "success"
        except:
            return "failed"

    def getAllProject(self):
        try:
            result = col.find()
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3})

            return projectArray

        except:
            return "failed"

    def getProjectById(self):
        try:
            result = col.find({"_id": ObjectId(self["id"])})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3}

        except:
            return "failed"

    def getProjectBytitle(self):
        try:
            result = col.find({"title": self["title"]})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3}

        except:
            return "failed"

    def getProjectByClass(self):
        try:
            result = col.find({"class": self["class"]})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "title": i["title"], "content": i["content"],
                     "step1": i["step1"], "step2": i["step2"], "step3": i["step3"], "totalStep": 3})

            return projectArray

        except:
            return "failed"
