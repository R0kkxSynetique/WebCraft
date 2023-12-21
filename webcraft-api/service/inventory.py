
def getAllInventory(user_id):
    return {"message": "getAllInventory"}

def createInventory(user_id, name: str):
    return {"message": "createInventory"}

def updateInventory(inventory_id, name: str):
    return {"message": "updateInventory"}

def deleteInventory(inventory_id):
    return {"message": "deleteInventory"}
