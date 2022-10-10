from control import studentControl, projectStudentControl, commentControl, groupControl


def getComplteByProject(projectId, className):
    studentArray = studentControl.getUserByClass(className)
    projectStudentArray = projectStudentControl.getAllStudentByProject(projectId)
    allCompleteArray = []
    completeProjectArray = []
    completeCommentArray = []
    noCompleteArray = []

    for i in studentArray:
        if len(projectStudentArray) != 0:
            for j in projectStudentArray:
                if i["account"] == j["account"]:
                    if isCommentFinish(projectId, className, i["account"], i["groupName"]):
                        allCompleteArray.append(i["account"])
                    else:
                        completeProjectArray.append(i["account"])
                    break

                elif j == projectStudentArray[-1]:
                    if isCommentFinish(projectId, className, i["account"], i["groupName"]):
                        completeCommentArray.append(i["account"])
                    else:
                        noCompleteArray.append(i["account"])
        else:
            if isCommentFinish(projectId, className, i["account"], i["groupName"]):
                completeCommentArray.append(i["account"])
            else:
                noCompleteArray.append(i["account"])

    totalArrayLen = len(allCompleteArray)
    if len(completeProjectArray) > totalArrayLen:
        totalArrayLen = len(completeProjectArray)
    if len(completeCommentArray) > totalArrayLen:
        totalArrayLen = len(completeCommentArray)
    if len(noCompleteArray) > totalArrayLen:
        totalArrayLen = len(noCompleteArray)

    return {"allCompleteArray": allCompleteArray, "completeProjectArray": completeProjectArray,
            "completeCommentArray": completeCommentArray, "noCompleteArray": noCompleteArray,
            "totalArrayLen": totalArrayLen}


def isCommentFinish(projectId, className, account, groupName):
    commentArray = commentControl.getCommentByProjectAndCommentator(projectId, account)
    group = groupControl.getGroupByName(className, groupName)

    if (len(group) == 0 or group == "failed"):
        return False

    if len(commentArray) != 0:
        hadCommentMember = 0
        for i in commentArray:
            if i["owner"] == group["member1"]:
                hadCommentMember += 1
            elif i["owner"] == group["member2"]:
                hadCommentMember += 1
            elif i["owner"] == group["member3"]:
                hadCommentMember += 1
            elif "member4" in group:
                if i["owner"] == group["member4"]:
                    hadCommentMember += 1

        if "member4" in group and hadCommentMember == 3 or "member4" not in group and hadCommentMember == 2:
            return True
        else:
            return False
