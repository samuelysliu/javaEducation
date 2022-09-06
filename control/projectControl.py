from module.projectInfo import projectInfo
from bson.objectid import ObjectId


def getAllProject():
    return projectInfo.getAllProject(self="")


def getProjectByClass(className):
    return projectInfo.getProjectByClass({"class": className})


def getProjectById(projectId):
    return projectInfo.getProjectById({"id": projectId})


def saveProject(*args):
    result = projectInfo.saveProject(
        {"title": args[0]["title"], "class": args[0]["class"], "content": args[0]["content"],
         "step1": args[0]["step1"], "step2": args[0]["step2"], "step3": args[0]["step3"]})

    if result == "failed":
        return result
    else:
        return "success"


def updateProject(*args):
    myquery = {"_id": ObjectId(args[0]["id"])}
    newValues = {
        "$set": {"title": args[0]["title"], "class": args[0]["class"], "content": args[0]["content"], "step1": args[0]["step1"],
                 "step2": args[0]["step2"], "step3": args[0]["step3"], "totalStep": args[0]["totalStep"] }}
    result = projectInfo.updateProject(
        {"myquery": myquery, "newValues": newValues})

    return result

def deleteProject(projectId):
    return projectInfo.deleteProject({"id": projectId})
