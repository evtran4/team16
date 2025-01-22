from pydantic import BaseModel, EmailStr
from typing import List

class TestSchema(BaseModel):
    test: str