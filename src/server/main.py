from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from starlette.responses import JSONResponse
from config import users_collection, mailConf
from schemas import TestSchema
from serializers import test_serializer


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

rawTest = users_collection.find({})
test = test_serializer(rawTest[0])
print(test)
print(test["id"])
print(test["test"])

def generateVerificationEmail(code):
    return """<p>Your Split verification code is:  """ + code + """. If you did not request this code, please ignore this email.</p>"""

@app.post("/createAccount")
async def createAccount(account: AccountSchema):
    id = users_collection.insert_one(dict(account))
    account = user_serializer(users_collection.find_one({"_id": id.inserted_id}))

@app.get("/getUserByCookie/{cookie}")
async def getUser(cookie: str):
    user = users_collection.find_one({"cookie" : cookie})
    if user == None:
        return {"cookie" : -1}
    else:
        user = user_serializer(user)
        return user

@app.get("/getAllUsers")
async def getAllUsers():
    rawUsers = users_collection.find({})
    users = []
    for rawUser in rawUsers:
        user = user_serializer(rawUser)
        users.append(user)
    return users

@app.get("/getBatch/{cookie}")
async def getBatch(cookie: str):
    rawUser = users_collection.find_one({"cookie": cookie})
    user = user_serializer(rawUser)
    seen = user["seen"] 
    dealbreakers = user["dealbreakers"]
    rawBatch = users_collection.find({"cookie" : {'$nin': seen, '$ne':cookie}, "tags" : {'$nin': dealbreakers}}).limit(10)
    batch = []
    for user in rawBatch:
        batch.append(user_serializer(user))
    return batch

@app.get("/getUserByLogin/{email}/{password}")
async def getUser(email: str, password: str):
    user = users_collection.find_one({"email" : email, "password" : password})
    if user == None:
        return {"cookie" : "-1"}
    else:
        user = user_serializer(user)
        return user

@app.get("/checkValidEmail/{email}")
async def checkEmail(email: str):
    user = users_collection.find_one({"email" : email})
    if user != None:
        return {"valid" : False}
    else:
        return {"valid" : True}

@app.post("/email/{code}")
async def send(email: EmailSchema, code: str) -> JSONResponse:
    html = generateVerificationEmail(code)
    message = MessageSchema(
        subject="Verify your Terpmail Address",
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html)


####  COMMENTS  ####
# We will need a user serializer for each user
# Ways to users by either their id or their cookie
# each user will have a unique id
# search funciton to reutrn 5-10 users based on a name search (probably the most complicated)
# field for each user showing ongoing payments (requests and requested)
# email notification for payment stuff

#cookie, username, password, ongoing payments, user email