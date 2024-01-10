from mongo import *

def getAllInventory(user_id, db: Mongo):
    return db.getUserInventories(user_id)

def createInventory(user_id, name: str,date: str, db: Mongo):
    return db.createInventory(user_id, name, date)

def updateInventory(inventory_id, name: str, date: str, db: Mongo):
    return db.updateInventory(inventory_id, name, date)

def deleteInventory(inventory_id, db: Mongo):
    return db.deleteInventory(inventory_id)
