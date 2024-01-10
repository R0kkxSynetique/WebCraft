from mongo import *

def getSave(inventory_id: str):
    return {"message": "get save content with save id"}

def postSave(inventory_id, inventory):
    db = Mongo()
    return db.saveInventory(inventory_id, inventory)