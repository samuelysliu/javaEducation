import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
conn = MongoClient(os.getenv('mongoDB'))

db = conn[os.getenv('dbName')]

class dbInfo:
    #user list
    def user(self):
        col = db["user"]
        return col

    #project list
    def project(self):
        col = db["project"]
        return col
    #all student upload file
    def file(self):
        col = db["file"]
        return col

    #all student comment
    def comment(self):
        col = db["comment"]
        return col

    def group(self):
        col = db["group"]
        return col

    def classList(self):
        col = db["classList"]
        return col

    def projectStudend(self):
        col = db["projectStudent"]
        return col