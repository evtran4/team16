from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from starlette.responses import JSONResponse
from config import users_collection, mailConf
from schemas import TestSchema, EmailSchema, AccountSchema, TransactionSchema
from serializers import test_serializer, user_serializer, transaction_serializer

from PIL import Image
import PIL.Image
import io
import pytesseract
import re



app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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

@app.get("/searchUser/{search}")
async def searchUser(search: str):
    rawUsers = users_collection.find({"name": {'$regex' : search , '$options': "i" }}).limit(5)
    userBatch = [user_serializer(user) for user in rawUsers]
    return userBatch

@app.post("/sendTransaction")
async def sendTransaction(transaction: TransactionSchema):
    users_collection.update_one({'cookie' : transaction.paymentTo}, { '$push' : { "notifications" : transaction.dict()}})
    users_collection.update_one({'cookie' : transaction.paymentFrom}, { '$push' : { "notifications" : transaction.dict()}})
 
@app.post("/verifyEmail/{code}")
async def send(email: EmailSchema, code: str) -> JSONResponse:
    html = generateVerificationEmail(code)
    message = MessageSchema(
        subject="Verify your Terpmail Address",
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html)
    fm = FastMail(mailConf)
    await fm.send_message(message)

@app.delete("/sendPayment/{id}")
async def sendPayment(id: str):
    # Update query to remove the transaction object with the specified ID

    update_query = {
        "$pull": {
            "notifications": {"id": id}
        }
    }

    result = users_collection.update_many({}, update_query)


@app.post("/getItems")
async def upload_image(file: UploadFile = File(...)):
    try:
        myconfig = r"--psm 6 --oem 1"

        contents = await file.read()
        # Open the image with PIL
        image = Image.open(io.BytesIO(contents))
        image = image.convert("RGB")

        text = pytesseract.image_to_string(image, config=myconfig)
        print(text)
        text = re.findall(r'(\d+\s*x?\s*\w+(?: \w+)*)\s*[-]?\s*\$?(\d+\.\d{2})', text)
        print(text)

 
        items = [{'id': idx + 1, 'name': item[0].strip(), 'price': item[1]} for idx, item in enumerate(text)]

        return {
            "items": items,
        }
    except Exception as e:
        return {"error": str(e)}
####  COMMENTS  ####
# We will need a user serializer for each user
# Ways to users by either their id or their cookie
# each user will have a unique id
# search funciton to reutrn 5-10 users based on a name search (probably the most complicated)
# field for each user showing ongoing payments (requests and requested)
# email notification for payment stuff

#cookie, username, password, ongoing payments, user email