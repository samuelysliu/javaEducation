from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

col = dbInfo.comment(self='')


class commentInfo:
    def saveComment(self):
        try:
            result = col.insert_one(
                {"projectId": ObjectId(self["projectId"]), "commentator": self["commentator"],
                 "comment": self["comment"], "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def getCommentByProject(self):
        try:
            result = col.find({"projectId": ObjectId(self["projectId"])})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "projectId": str(i["projectId"]), "commentator": i["commentator"],
                     "comment": i["comment"]})

            return projectArray

        except:
            return "failed"

    def getCommentByCommentator(self):
        try:
            result = col.find({"commentator": self["commentator"]})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "projectId": i["projectId"], "commentator": i["commentator"],
                     "comment": i["comment"]})

            return projectArray
        except:
            return "failed"