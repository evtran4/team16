from pymongo.mongo_client import MongoClient
import certifi
from fastapi_mail import ConnectionConfig

uri = "mongodb+srv://btt:team16@split.wlvrl.mongodb.net/?retryWrites=true&w=majority&appName=Split"
client = MongoClient(uri, tlsCAFile=certifi.where())

db = client.Split
users_collection = db["users"]

mailConf = ConnectionConfig(
    MAIL_USERNAME ="shellmatesumd@gmail.com",
    MAIL_PASSWORD = "rxkx gyjo vkyy kngi",
    MAIL_FROM = "shellmatesumd@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="Split",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)