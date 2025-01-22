def test_serializer(testdata) -> dict:
    return {
        "id": str(testdata["_id"]),
        "test": testdata["test"]
    }