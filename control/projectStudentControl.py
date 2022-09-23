from module.projectStudentInfo import projectStudentInfo

projectStudentDB = projectStudentInfo()

def checkRecord(account, projectId):
    record = projectStudentDB.getRecord({"account": account, "projectId": projectId})
    if len(record) == 0 or record == "failed":
        return False
    else:
        return True

def saveRecord(*args):
    if str(args[0]["stepNum"]) == "3":
        if not checkRecord(args[0]["account"], args[0]["projectId"]):
            result = projectStudentDB.saveProjectStudent({"projectId": args[0]["projectId"], "account": args[0]["account"]})
            if result == "failed":
                return result
            else:
                return "success"
        return "success"
    else:
        return "success"

def getAllStudentByProject(projectId):
    return projectStudentDB.getAllStudentByProject({"projectId": projectId})

def getAllProjecyByStudent(account):
    return projectStudentDB.getAllProjectByStudent({"account": account})