from mongo import *

def getAllInventory(user_id, db: Mongo):
    return db.getInventoriesByUserId(user_id)

def createInventory(user_id, name: str, db: Mongo):
    return {"message": "createInventory"}

def updateInventory(inventory_id, name: str, db: Mongo):
    return {"message": "updateInventory"}

def deleteInventory(inventory_id, db: Mongo):
    return {"message": "deleteInventory"}
