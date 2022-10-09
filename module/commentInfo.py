from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools


class commentInfo:
    def __init__(self):
        self.col = dbInfo.comment(self='')

    def saveComment(self, *args):
        try:
            result = self.col.insert_one(
                {"projectId": ObjectId(args[0]["projectId"]), "owner": args[0]["owner"],
                 "commentator": args[0]["commentator"], "comment": args[0]["comment"],
                 "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def getCommentByProject(self, *args):
        try:
            result = self.col.find({"projectId": ObjectId(args[0]["projectId"]), "owner": args[0]["owner"]})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "projectId": str(i["projectId"]), "owner": i["owner"],
                     "commentator": i["commentator"], "comment": i["comment"]})

            return projectArray

        except:
            return "failed"

    def getCommentByCommentator(self, *args):
        try:
            result = self.col.find({"commentator": args[0]["commentator"], "owner": args[0]["owner"]})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "projectId": str(i["projectId"]), "owner": i["owner"],
                     "commentator": i["commentator"], "comment": i["comment"]})

            return projectArray
        except:
            return "failed"

    def getCommentByProjectAndCommentator(self, *args):
        try:
            result = self.col.find({"projectId": ObjectId(args[0]["projectId"]), "commentator": args[0]["commentator"]})
            projectArray = []
            for i in result:
                projectArray.append(
                    {"id": str(i["_id"]), "projectId": str(i["projectId"]), "owner": i["owner"],
                     "commentator": i["commentator"], "comment": i["comment"]})

            return projectArray
        except:
            return "failed"
