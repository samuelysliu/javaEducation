import datetime
import hashlib

def getTimeNow():
    return datetime.datetime.now()

def md5(someString):
    return  hashlib.md5(someString.encode("utf-8")).hexdigest()