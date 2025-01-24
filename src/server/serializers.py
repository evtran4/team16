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
        "major": user["major"],
        "tags" : user["tags"],
        "likes": user["likes"],
        "bio": user["bio"],
        "seen": user["seen"],
        "dealbreakers": user["dealbreakers"],
        "cookie": user["cookie"]
    }