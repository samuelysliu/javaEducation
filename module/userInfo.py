from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

class userInfo:
    def __init__(self):
        self.col = dbInfo.user(self='')

    def saveUser(self, *args):
        try:
            result = self.col.insert_one({"class": args[0]["class"], "account": args[0]["account"], "password": args[0]["password"],
                                     "authority": args[0]["authority"], "label": args[0]["label"],
                                     "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateUser(self, *args):
        try:
            self.col.update_one(args[0]["myquery"], args[0]["newValues"])
            return "success"
        except:
            return "failed"

    def getAllUser(self):
        try:
            result = self.col.find()
            userArray = []
            for i in result:
                userArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                     "authority": i["authority"], "label": i["label"]})

            return userArray

        except:
            return "failed"

    def getUserById(self, *args):
        try:
            result = self.col.find({"_id": ObjectId(args[0]["_id"])})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                    "authority": i["authority"], "label": i["label"]}

        except:
            return "failed"

    def getUserByAccount(self, *args):
        try:
            result = self.col.find({"account": args[0]["account"]})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                    "authority": i["authority"], "label": i["label"]}

        except:
            return "failed"

    def getUserByClass(self, *args):
        try:
            result = self.col.find({"class": args[0]["class"]})
            userArray = []
            for i in result:
                userArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                     "authority": i["authority"], "label": i["label"]})

            return userArray

        except:
            return "failed"

    def userLogin(self, *args):
        try:
            result = self.col.find({"account": args[0]["account"], "password": args[0]["password"]})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "authority": i["authority"],
                    "label": i["label"]}
        except:
            return "failed"
