from control import studentControl, projectStudentControl, commentControl, groupControl


def getComplteByProject(projectId, className):
    studentArray = studentControl.getUserByClass(className)
    projectStudentArray = projectStudentControl.getAllStudentByProject(projectId)
    allCompleteArray = []
    completeProjectArray = []
    completeCommentArray = []
    noCompleteArray = []

    for i in studentArray:
        for j in projectStudentArray:
            if i["account"] == j["account"]:
                commentArray = commentControl.getCommentByProjectAndCommentator(projectId, i["account"])
                group = groupControl.getGroupByName(className, i["groupName"])

                if (len(group) == 0 or group == "failed"):
                    break

                if len(commentArray) != 0:
                    hadCommentMember = 0
                    for k in commentArray:
                        if k["owner"] == group["member1"]:
                            hadCommentMember += 1
                        elif k["owner"] == group["member2"]:
                            hadCommentMember += 1
                        elif k["owner"] == group["member3"]:
                            hadCommentMember += 1
                        elif "member4" in group:
                            if k["owner"] == group["member4"]:
                                hadCommentMember += 1

                    if "member4" in group and hadCommentMember == 4 or "member4" not in group and hadCommentMember == 3:
                        allCompleteArray.append(i["account"])
                    else:
                        completeProjectArray.append(i["account"])
                else:
                    completeProjectArray.append(i["account"])

                break
            elif j == projectStudentArray[-1]:
                commentArray = commentControl.getCommentByProjectAndCommentator(projectId, i["account"])
                group = groupControl.getGroupByName(className, i["groupName"])

                if (len(group) == 0 or group == "failed"):
                    break

                if len(commentArray) != 0:
                    hadCommentMember = 0
                    for k in commentArray:
                        if k["owner"] == group["member1"]:
                            hadCommentMember += 1
                        elif k["owner"] == group["member2"]:
                            hadCommentMember += 1
                        elif k["owner"] == group["member3"]:
                            hadCommentMember += 1
                        elif "member4" in group:
                            if k["owner"] == group["member4"]:
                                hadCommentMember += 1

                    if "member4" in group and hadCommentMember == 4 or "member4" not in group and hadCommentMember == 3:
                        completeCommentArray.append(i["account"])
                    else:
                        noCompleteArray.append(i["account"])
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
