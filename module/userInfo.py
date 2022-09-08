from module.dbInfo import dbInfo
from bson.objectid import ObjectId
import tools

col = dbInfo.user(self='')


class userInfo:
    def saveUser(self):
        try:
            result = col.insert_one({"class": self["class"], "account": self["account"], "password": self["password"],
                                     "authority": self["authority"], "label": self["label"],
                                     "createdTime": tools.getTimeNow()})
            return result.inserted_id
        except:
            return "failed"

    def updateUser(self):
        try:
            col.update_one(self["myquery"], self["newValues"])
            return "success"
        except:
            return "failed"

    def getAllUser(self):
        try:
            result = col.find()
            userArray = []
            for i in result:
                userArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                     "authority": i["authority"], "label": i["label"]})

            return userArray

        except:
            return "failed"

    def getUserById(self):
        try:
            result = col.find({"_id": ObjectId(self["_id"])})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                    "authority": i["authority"], "label": i["label"]}

        except:
            return "failed"

    def getUserByAccount(self):
        try:
            result = col.find({"account": self["account"]})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                    "authority": i["authority"], "label": i["label"]}

        except:
            return "failed"

    def getUserByClass(self):
        try:
            result = col.find({"class": self["class"]})
            userArray = []
            for i in result:
                userArray.append(
                    {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "password": i["password"],
                     "authority": i["authority"], "label": i["label"]})

            return userArray

        except:
            return "failed"

    def userLogin(self):
        try:
            result = col.find({"account": self["account"], "password": self["password"]})
            i = result[0]
            return {"id": str(i["_id"]), "class": i["class"], "account": i["account"], "authority": i["authority"],
                    "label": i["label"]}
        except:
            return "failed"
