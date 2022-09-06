from module.fileInfo import fileInfo
import os
from bson.objectid import ObjectId


def getFileByUserAndProject(projectId, account):
    return fileInfo.getFileByUserAndProject({"projectId": projectId, "account": account})


def saveFile(file, fileName, projectId, account, stepNum):
    filePath = 'JavaFile/' + str(account) + '/' + projectId
    fileName = stepNum + '_' + fileName
    if not os.path.isdir(filePath):
        os.makedirs(filePath)

    file.save(os.path.join(filePath, fileName))

    result = fileInfo.saveFile({"projectId": projectId, "stepNum": stepNum, "account": account, "filePath": filePath})

    if result != "failed":
        return "success"
    return result
