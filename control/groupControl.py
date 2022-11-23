from module.groupInfo import groupInfo
from module.userInfo import userInfo
import pandas as pd
import json

groupDB = groupInfo()
userDB = userInfo()


def grouping(file, className):
    try:
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

        # if user total % 3 == 2 let low group and mid group +1 if % 3 ==1 let low group +1
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

        groupNum = groupCaculator(len(userArray))
        groupList = {}

        for i in range(len(userArray)):
            if i < lowNum:
                userDB.updateUser(
                    {"myquery": {"account": userArray[i][0]}, "newValues": {"$set": {"label": "low"}}})

                if i >= groupNum:
                    groupList[0].append(userArray[i][0])
                else:
                    groupList[i] = [userArray[i][0]]

            elif i < lowNum + midNum:
                userDB.updateUser(
                    {"myquery": {"account": userArray[i][0]}, "newValues": {"$set": {"label": "mid"}}})

                if i - lowNum + 1 > groupNum:
                    groupList[1].append(userArray[i][0])
                else:
                    groupList[i - lowNum].append(userArray[i][0])
            else:
                userDB.updateUser(
                    {"myquery": {"account": userArray[i][0]}, "newValues": {"$set": {"label": "high"}}})

                groupList[i - lowNum - midNum].append(userArray[i][0])

        updateGroup(groupList, className)

        return "success"
    except:
        return "failed"


def groupCaculator(userArrayLen):
    if userArrayLen <= 5:
        return 1
    else:
        return userArrayLen // 3


def updateGroup(groupList, className):
    # 刪除該班級組別，重新分組
    groupDB.deleteGroupByClass({"class": className})

    for i in range(len(groupList)):
        userArray = groupDB.getGroupByName({"name": i + 1, "class": className})
        if len(userArray) == 0 or userArray == "failed":
            groupDB.saveGroup({"name": i + 1, "class": className})

        mongoCommand = {"myquery": {"name": i + 1, "class": className}, "newValues": {"$set": {}}}
        for j in range(len(groupList[i])):
            mongoCommand["newValues"]["$set"][f"member{j + 1}"] = groupList[i][j]
            userDB.updateUser(
                {"myquery": {"account": groupList[i][j]}, "newValues": {"$set": {"groupName": i + 1}}})

        groupDB.updateGroup(mongoCommand)


def getGroupByClass(className):
    groupList = groupDB.getGroupByClass({"class": className})
    groupArray = []
    for i in groupList:
        i['_id'] = str(i['_id'])
        i['createdTime'] = str(i['createdTime'])
        groupArray.append(i)
    return groupArray


def getGroupByName(className, groupName):
    try:
        groupName = int(groupName)
    except:
        groupName = groupName

    try:
        group = groupDB.getGroupByName({"class": className, "name": groupName})
        group['_id'] = str(group['_id'])
        group['createdTime'] = str(group['createdTime'])
        return group
    except:
        return group
