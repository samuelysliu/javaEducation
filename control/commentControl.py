from module.commentInfo import commentInfo


def getCommentByProject(projectId):
    return commentInfo.getCommentByProject({"projectId": projectId})


def saveComment(*args):
    try:
        result = commentInfo.saveComment(
            {"projectId": args[0]["projectId"], "commentator": args[0]["commentator"], "comment": args[0]["comment"]})

        if result != "failed":
            return "success"
        return result
    except:
        return "failed"