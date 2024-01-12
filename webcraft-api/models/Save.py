from bson import ObjectId
from pydantic import BaseModel

from fastapi.encoders import jsonable_encoder
from mongo import mongo


class Save(BaseModel):
    owner_id: str | None = None
    save_id: str | None = None
    name: str | None = None
    date: str | None = None
    items: list | None = None

    def getUserSavesWithoutItems(userId):
        coll = mongo.db["inventories"]
        saves = coll.find({"owner_id": userId}, {"_id": 1, "name": 1, "date": 1})
        saves = list(saves)
        formattedSaves = []
        for save in saves:
            save["id"] = str(save["_id"])
            save.pop("_id")
            formattedSaves.append(save)
        return jsonable_encoder(formattedSaves)

    def deleteSave(saveId):
        coll = mongo.db["inventories"]
        obj_id = ObjectId(saveId)
        res = coll.delete_one({"_id": obj_id})
        return res.deleted_count

    def renameSave(saveId, name):
        coll = mongo.db["inventories"]
        obj_id = ObjectId(saveId)
        res = coll.update_one({"_id": obj_id}, {"$set": {"name": name}})
        return res.modified_count
    
    def saveInventory(inventoryId, items, date):
        coll = mongo.db["inventories"]
        res = coll.update_one(
            {"_id": ObjectId(inventoryId)}, {"$set": {"items": items, "date": date}}
        )
        return res.raw_result

    def getInventory(userId, inventoryId):
        coll = mongo.db["inventories"]
        obj_id = ObjectId(inventoryId)
        res = coll.find_one({"_id": obj_id, "owner_id": userId}, {"_id": 0, "items": 1})
        return res

    def createInventory(userId, name, date):
        coll = mongo.db["inventories"]
        inventory = {"owner_id": userId, "name": name, "date": date, "items": []}
        res = coll.insert_one(inventory)
        return str(res.inserted_id)

    def updateInventory(inventory_id, name, date):
        coll = mongo.db["inventories"]
        obj_id = ObjectId(inventory_id)
        coll.update_one({"_id": obj_id}, {"$set": {"name": name, "date": date}})
        return {"message": "updateInventory"}

    