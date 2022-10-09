from module.fileInfo import fileInfo
from bson.objectid import ObjectId

fileDB = fileInfo()

def getFileByUserAndProject(projectId, account):
    return fileDB.getFileByUserAndProject({"projectId": projectId, "account": account})



def saveFile(*args):
    fileArray = getFileByUserAndProject(args[0]["projectId"], args[1])
    for i in fileArray:
        if args[0]["stepNum"] == i["stepNum"]:
            myquery = {"_id": ObjectId(i["id"])}
            newValues = {"$set": {"code": args[0]["code"]}}
            result = fileDB.updateFile({"myquery": myquery, "newValues": newValues})
            return result

    result = fileDB.saveFile({"projectId": args[0]["projectId"], "stepNum": args[0]["stepNum"], "account": args[1], "code": args[0]["code"]})

    if result != "failed":
        return "success"
    return result
