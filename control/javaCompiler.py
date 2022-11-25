import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

def checkCredict():
    data = {
        "clientId": os.getenv("clientId_1"),
        "clientSecret": os.getenv("clientSecret_1"),
    }
    response = requests.post(url="https://api.jdoodle.com/credit-spent", json=data)
    if int(json.loads(response.text)["used"]) > 200:
        data = {
            "clientId": os.getenv("clientId_2"),
            "clientSecret": os.getenv("clientSecret_2"),
        }
        response = requests.post(url="https://api.jdoodle.com/credit-spent", json=data)

        if int(json.loads(response.text)["used"]) > 200:
            return os.getenv("clientId_3"), os.getenv("clientSecret_3")
        else:
            return os.getenv("clientId_2"), os.getenv("clientSecret_2")
    else:
        return os.getenv("clientId_1"), os.getenv("clientSecret_1")

def compiler(*args):
    javaCode = args[0]["code"]
    userInput = args[0]["userInput"]


    clientId, clientSecret = checkCredict()

    data = {
        "clientId": clientId,
        "clientSecret": clientSecret,
        "script": javaCode,
        "stdin": userInput,
        "language": "java",
        "versionIndex": "3"
    }
    print(data)
    response = requests.post(url="https://stage.jdoodle.com/execute", json=data)
    print(response.text)
    return json.loads(response.text)["output"]