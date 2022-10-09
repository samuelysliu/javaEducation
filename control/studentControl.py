from module.userInfo import userInfo

userDB = userInfo()

def getUserByClass(className):
    return userDB.getUserByClass({"class": className})
