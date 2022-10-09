from module.commentInfo import commentInfo

commentDB = commentInfo()


def getCommentByCommentator(commentator, owner):
    return commentDB.getCommentByCommentator({"commentator": commentator, "owner": owner})


def getCommentByProject(projectId, owner):
    return commentDB.getCommentByProject({"projectId": projectId, "owner": owner})


def getCommentByProjectAndCommentator(projectId, commentator):
    return commentDB.getCommentByProjectAndCommentator({"projectId": projectId, "commentator": commentator})


def saveComment(*args):
    try:
        result = commentDB.saveComment(
            {"projectId": args[0]["projectId"], "owner": args[0]["owner"], "commentator": args[0]["commentator"],
             "comment": args[0]["comment"]})
        if result != "failed":
            return "success"
        return result
    except:
        return "failed"
