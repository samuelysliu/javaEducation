from module.userInfo import userInfo
import tools
from bson.objectid import ObjectId


def register(*args):
    try:
        if userInfo.getUserByAccount({"account": args[0]["account"]}) != "failed":
            return "failed"

        result = userInfo.saveUser({"class": args[0]["class"], "account": args[0]["account"],
                                    "password": tools.md5(args[0]["password"]), "authority": "student",
                                    "label": ""})

        if result == "failed":
            return result

        else:
            return "success"
    except:
        return "failed"


def login(*args):
    try:
        userProfile = userInfo.userLogin({"account": args[0]["account"], "password": tools.md5(args[0]["password"])})
        if userProfile != "failed":
            return userProfile
        else:
            return "failed"
    except:
        return "failed"


def changePassword(*args):
    try:
        myquery = {"_id": ObjectId(args[0]["userId"])}
        newValues = {"$set": {"password": tools.md5(args[0]["password"])}}
        result = userInfo.updateUser({"myquery": myquery, "newValues": newValues})

        return result
    except:
        return "failed"

def chageLabel(*args):
    try:
        myquery = {"_id": ObjectId(args[0]["userId"])}
        newValues = {"$set": {"label": args[0]["label"]}}
        result = userInfo.updateUser({"myquery": myquery, "newValues": newValues})

        return result
    except:
        return "failed"
