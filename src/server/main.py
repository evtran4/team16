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
    return """<p>Your ShellMates verification code is:  """ + code + """. If you did not request this code, please ignore this email.</p>"""


####  COMMENTS  ####
# We will need a user serializer for each user
# Ways to users by either their id or their cookie
# each user will have a unique id
# search funciton to reutrn 5-10 users based on a name search (probably the most complicated)
# field for each user showing ongoing payments (requests and requested)
# email notification for payment stuff

#cookie, username, password, ongoing payments, user email