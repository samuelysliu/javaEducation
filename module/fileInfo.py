from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

col = dbInfo.file(self='')


class fileInfo:
    def saveFile(self):
        try:
            result = col.insert_one(
                {"projectId": ObjectId(self["projectId"]), "stepNum": self["stepNum"],
                 "account": self["account"], "code": self["code"], "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateFile(self):
        try:
            col.update_one(self["myquery"], self["newValues"])
            return "success"
        except:
            return "failed"

    def getAllFile(self):
        try:
            result = col.find()
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})

            return fileArray

        except:
            return "failed"

    def getFileByUser(self):
        try:
            result = col.find({"account": self["account"]})
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})
            return fileArray

        except:
            return "failed"

    def getFilByProject(self):
        try:
            result = col.find({"projectId": ObjectId(self["projectId"])})
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})
            return fileArray

        except:
            return "failed"

    def getFileByUserAndProject(self):
        try:
            result = col.find({"account": self["account"], "projectId": ObjectId(self["projectId"])}).sort(
                [("createdTime", -1)])
            fileArray = []
            for i in result:
                fileArray.append(
                    {"id": str(i["_id"]), "projectId": str(i["projectId"]), "stepNum": i["stepNum"], "account": i["account"],
                     "code": i["code"]})
            return fileArray

        except:
            return "failed"
