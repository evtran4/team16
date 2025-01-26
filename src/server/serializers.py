def test_serializer(testdata) -> dict:
    return {
        "id": str(testdata["_id"]),
        "test": testdata["test"]
    }

def user_serializer(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "password": user["password"],
        "cookie": user["cookie"],
        "notifications": user["notifications"]
    }

def transaction_serializer(transaction) -> dict:
    return {
        "id": transaction["id"],
        "to": transaction["name"],
        "email": transaction["email"],
        "password": transaction["password"],
        "cookie": transaction["cookie"]
    }