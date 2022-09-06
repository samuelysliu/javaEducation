from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

col = dbInfo.group(self='')


class groupInfo:
    def saveGroup(self):
        try:
            result = col.insert_one(
                {"projectId": self["projectId"], "class": self["class"], "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateGroup(self):
        try:
            col.update_one(self["myquery"], self["newValues"])
            return "success"
        except:
            return "failed"

    def getGroupByClass(self):
        try:
            result = col.find({"class": ObjectId(self["class"])})
            groupArray = []
            for i in result:
                groupArray.append(i)

            return groupArray

        except:
            return "failed"

    def getGroupById(self):
        try:
            result = col.find({"_id": ObjectId(self["_id"])})
            groupArray = []
            for i in result:
                groupArray.append(i)

            return groupArray

        except:
            return "failed"

    def getGroupByProject(self):
        try:
            result = col.find({"projectId": ObjectId(self["projectId"])})
            groupArray = []
            for i in result:
                groupArray.append(i)

            return groupArray
        except:
            return "failed"