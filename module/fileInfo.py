from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

class fileInfo:
    def __init__(self):
        self.col = dbInfo.file(self='')

    def saveFile(self, *args):
        try:
            result = self.col.insert_one(
                {"projectId": ObjectId(args[0]["projectId"]), "stepNum": args[0]["stepNum"],
                 "account": args[0]["account"], "code": args[0]["code"], "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateFile(self, *args):
        try:
            self.col.update_one(args[0]["myquery"], args[0]["newValues"])
            return "success"
        except:
            return "failed"

    def getAllFile(self):
        try:
            result = self.col.find()
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})

            return fileArray

        except:
            return "failed"

    def getFileByUser(self, *args):
        try:
            result = self.col.find({"account": args[0]["account"]})
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})
            return fileArray

        except:
            return "failed"

    def getFilByProject(self, *args):
        try:
            result = self.col.find({"projectId": ObjectId(args[0]["projectId"])})
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})
            return fileArray

        except:
            return "failed"

    def getFileByUserAndProject(self, *args):
        try:
            result = self.col.find({"account": args[0]["account"], "projectId": ObjectId(args[0]["projectId"])}).sort(
                [("createdTime", -1)])
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": str(i["projectId"]), "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})
            return fileArray

        except:
            return "failed"
