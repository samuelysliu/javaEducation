from module.commentInfo import commentInfo

commentDB = commentInfo()

def getCommentByProject(projectId):
    return commentDB.getCommentByProject({"projectId": projectId})


def saveComment(*args):
    try:
        result = commentDB.saveComment(
            {"projectId": args[0]["projectId"], "commentator": args[0]["commentator"], "comment": args[0]["comment"]})

        if result != "failed":
            return "success"
        return result
    except:
        return "failed"