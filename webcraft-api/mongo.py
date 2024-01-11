import os

from pymongo import MongoClient

from bson.json_util import dumps
from bson.objectid import ObjectId

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from bson.objectid import ObjectId

class Mongo:
    def __init__(self):
        self.__db = self.__get_database()
        pass
    
    def __get_database(self):
        CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
        client = MongoClient(CONNECTION_STRING)
        return client[os.getenv("DB_NAME")]

    def getItemById(self, id):
        coll = self.__db["items"]
        item = coll.find_one({"id": id}, {'_id': 0})
        item = jsonable_encoder(item)
        return JSONResponse(content=item)
    
    def getRandomItem(self):
        coll = self.__db["items"]
        random_item = coll.aggregate([{ '$sample': { 'size': 1 } },{'$project':{'_id':0}}]).next()
        return JSONResponse(content=random_item)
    
    def getRecipeById(self, id):
        coll = self.__db["recipes"]
        recipe = coll.find_one({str(id): {"$type":3}}, {'_id': 0})
        recipe = jsonable_encoder(recipe)
        return JSONResponse(content=recipe)
    
    def getUserInventories(self, userId):
        coll = self.__db["inventories"]
        inventories = coll.find({}, {'_id': 0})
        inventories = list(inventories)
        res = jsonable_encoder(inventories)
        return JSONResponse(content=res)
    
    def saveInventory(self, inventoryId, items):
        coll = self.__db["inventories"]
        res = coll.update_one({"_id": ObjectId(inventoryId)}, {"$set": {"items": items}})
        return JSONResponse(content=res.raw_result)

    def getSaveById(self, id):
        coll = self.__db["inventories"]
        obj_id = ObjectId(id)
        save = coll.find_one({"_id": obj_id}, {'_id': 0})
        save = jsonable_encoder(save)
        return JSONResponse(content=save)
    
    def createInventory(self, userId, name, date):
        coll = self.__db["inventories"]
        inventory = {"owner_id": userId, "name": name, "date": date, "items": []}
        res = coll.insert_one(inventory)
        return JSONResponse(content={"message": "createInventory"})

    def getRecipeResultByIngredientsId(self, ingredients):
        coll = self.__db["recipes"]
        cursor = coll.find({}, {"_id": 0})
        res = {}
        for document in cursor:
            for key, value in document.items():
                if "inShape" in value and value["inShape"] == ingredients:
                    res = document[key]["result"]
                elif "ingredients" in value and value["ingredients"] == ingredients:
                    res = document[key]["result"]
        return JSONResponse(content=res)
    
    def updateInventory(self, inventory_id, name, date):
        coll = self.__db["inventories"]
        obj_id = ObjectId(inventory_id)
        coll.update_one({"_id": obj_id}, {"$set": {"name": name, "date": date}})
        return JSONResponse(content={"message": "updateInventory"})

    def deleteInventory(self, inventory_id):
        coll = self.__db["inventories"]
        obj_id = ObjectId(inventory_id)
        coll.delete_one({"_id": obj_id})
        return JSONResponse(content={"message": "deleteInventory"})