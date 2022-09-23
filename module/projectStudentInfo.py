from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools


class projectStudentInfo:
    def __init__(self):
        self.col = dbInfo.projectStudent(self='')

    def saveProjectStudent(self, *args):
        try:
            result = self.col.insert_one({"projectId": ObjectId(args[0]["projectId"]), "account": args[0]["account"],
                                     "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def getAllStudentByProject(self, *args):
        try:
            result = self.col.find({"projectId": ObjectId(args[0]["projectId"])})
            studentArray = []
            for i in result:
                studentArray.append(
                    {"projectId": str(i["projectId"]), "account": i["account"]})

            return studentArray
        except:
            return "failed"

    def getAllProjectByStudent(self, *args):
        try:
            result = self.col.find({"account": args[0]["account"]})
            studentArray = []
            for i in result:
                studentArray.append(
                    {"projectId": str(i["projectId"]), "account": i["account"]})

            return studentArray
        except:
            return "failed"

    def getRecord(self, *args):
        try:
            result = self.col.find({"account": args[0]["account"], "projectId": ObjectId(args[0]["projectId"])})
            return result[0]
        except:
            return "failed"
