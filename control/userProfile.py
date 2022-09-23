from module.userInfo import userInfo
import tools
from bson.objectid import ObjectId
import pandas as pd
import json

userDB = userInfo()


def register(*args):
    try:
        if userDB.getUserByAccount({"account": args[0]["account"]}) != "failed":
            return "failed"

        result = userDB.saveUser({"class": args[0]["class"], "account": args[0]["account"],
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
        userProfile = userDB.userLogin({"account": args[0]["account"], "password": tools.md5(args[0]["password"])})
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
        result = userDB.updateUser({"myquery": myquery, "newValues": newValues})
        return result
    except:
        return "failed"


def chageLabel(*args):
    try:
        myquery = {"_id": ObjectId(args[0]["userId"])}
        newValues = {"$set": {"label": args[0]["label"]}}
        result = userDB.updateUser({"myquery": myquery, "newValues": newValues})

        return result
    except:
        return "failed"


def grouping(file, fileName):
    data = pd.read_excel(file, header=0, converters={'identity': str, 'grades': int})
    dataString = data.to_json()
    # let data type as json
    dataJson = json.loads(dataString)

    # is stunder number is not match grades number means some column is empty
    if len(dataJson["identity"]) != len(dataJson["grades"]):
        return "column lost"

    # save user as dict
    userDict = {}
    for i in range(0, len(dataJson["identity"])):
        userDict[dataJson["identity"][str(i)]] = dataJson["grades"][str(i)]

    # sort user as tuple
    userArray = sorted(userDict.items(), key=lambda x: x[1])

    userNum = len(userArray) // 3
    if len(userArray) % 3 == 2:
        lowNum = userNum + 1
        midNum = userNum + 1
    elif len(userArray) % 3 == 1:
        lowNum = userNum + 1
        midNum = userNum
    else:
        lowNum = userNum
        midNum = userNum

    for i in range(len(userArray)):
        for j in range(lowNum):
            userDB.updateUser(
                {"myquery": {"account": userArray[0][i]}, "newValues": {"$set": {"authority": "low"}}})
        for j in range(midNum):
            userDB.updateUser(
                {"myquery": {"account": userArray[0][i]}, "newValues": {"$set": {"authority": "low"}}})
        for j in range(userNum):
            userDB.updateUser(
                {"myquery": {"account": userArray[0][i]}, "newValues": {"$set": {"authority": "low"}}})
