from mongo import *

def getSave(inventory_id: str, db: Mongo):
    print(inventory_id)
    return db.getSaveById(inventory_id)

def postSave(inventory_id, inventory):
    db = Mongo()
    return db.saveInventory(inventory_id, inventory)