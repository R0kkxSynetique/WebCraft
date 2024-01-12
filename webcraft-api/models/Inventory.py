from pydantic import BaseModel

from bson.objectid import ObjectId

from mongo import mongo


class Inventory(BaseModel):
    owner_id: str | None = None
    name: str | None = None
    date: str | None = None
    items: list | None = None

    def saveInventory(inventoryId, items):
        coll = mongo.db["inventories"]
        res = coll.update_one(
            {"_id": ObjectId(inventoryId)}, {"$set": {"items": items}}
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

    def deleteInventory(inventory_id):
        coll = mongo.db["inventories"]
        obj_id = ObjectId(inventory_id)
        coll.delete_one({"_id": obj_id})
        return {"message": "deleteInventory"}
