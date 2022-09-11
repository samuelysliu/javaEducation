from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

col = dbInfo.projectStudend(self='')


class projectStudentInfo:
    def saveProjectStudent(self):
        try:
            result = col.insert_one({"projectId": ObjectId(self["projectId"]), "account": self["account"],
                                     "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def getAllStudentByProject(self):
        try:
            result = col.find({"projectId": ObjectId(self["projectId"])})
            studentArray = []
            for i in result:
                studentArray.append(
                    {"projectId": str(i["projectId"]), "account": i["account"]})

            return studentArray
        except:
            return "failed"

    def getAllProjectByStudent(self):
        try:
            result = col.find({"account": self["account"]})
            studentArray = []
            for i in result:
                studentArray.append(
                    {"projectId": str(i["projectId"]), "account": i["account"]})

            return studentArray
        except:
            return "failed"

    def getRecord(self):
        try:
            result = col.find({"account": self["account"], "projectId": ObjectId(self["projectId"])})
            return result[0]
        except:
            return "failed"
