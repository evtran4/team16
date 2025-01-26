from pydantic import BaseModel, EmailStr
from typing import List

class TestSchema(BaseModel):
    test: str

class EmailSchema(BaseModel):
    email: List[EmailStr]

class NotificationSchema(BaseModel):
    sender: str
    recipient: str
    content: str

class AccountSchema(BaseModel):
    email: str
    password: str
    name: str
    cookie: str
    notifications: List

class TransactionSchema(BaseModel):
    id: str
    amount: str
    paymentTo: str
    paymentFrom: str


