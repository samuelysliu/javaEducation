from module.fileInfo import fileInfo
from bson.objectid import ObjectId


def getFileByUserAndProject(projectId, account):
    return fileInfo.getFileByUserAndProject({"projectId": projectId, "account": account})



def saveFile(*args):
    """
    filePath = 'JavaFile/' + str(account) + '/' + projectId
    fileName = stepNum + '_' + fileName
    if not os.path.isdir(filePath):
        os.makedirs(filePath)

    file.save(os.path.join(filePath, fileName))
    """

    fileArray = getFileByUserAndProject(args[0]["projectId"], args[1])
    for i in fileArray:
        if args[0]["stepNum"] == i["stepNum"]:
            myquery = {"_id": ObjectId(i["id"])}
            newValues = {"$set": {"code": args[0]["code"]}}
            result = fileInfo.updateFile({"myquery": myquery, "newValues": newValues})
            return result

    result = fileInfo.saveFile({"projectId": args[0]["projectId"], "stepNum": args[0]["stepNum"], "account": args[1], "code": args[0]["code"]})

    if result != "failed":
        return "success"
    return result
