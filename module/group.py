from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

class groupInfo:
    def __init__(self):
        self.col = dbInfo.group(self='')

    def saveGroup(self, *args):
        try:
            result = self.col.insert_one(
                {"projectId": args[0]["projectId"], "class": args[0]["class"], "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateGroup(self, *args):
        try:
            self.col.update_one(args[0]["myquery"], args[0]["newValues"])
            return "success"
        except:
            return "failed"

    def getGroupByClass(self, *args):
        try:
            result = self.col.find({"class": ObjectId(args[0]["class"])})
            groupArray = []
            for i in result:
                groupArray.append(i)

            return groupArray

        except:
            return "failed"

    def getGroupById(self, *args):
        try:
            result = self.col.find({"_id": ObjectId(args[0]["_id"])})
            groupArray = []
            for i in result:
                groupArray.append(i)

            return groupArray

        except:
            return "failed"

    def getGroupByProject(self, *args):
        try:
            result = self.col.find({"projectId": ObjectId(args[0]["projectId"])})
            groupArray = []
            for i in result:
                groupArray.append(i)

            return groupArray
        except:
            return "failed"