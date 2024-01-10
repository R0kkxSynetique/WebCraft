from mongo import *

def getSave(inventory_id: str, db: Mongo):
    print(inventory_id)
    return db.getSaveById(inventory_id)

def postSave(inventory_id: str, inventory: str, db: Mongo):
    return {"message": "post save content with save id"}