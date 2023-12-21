import os

from pymongo import MongoClient

from bson.json_util import dumps

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
class Mongo:
    def __init__(self):
        self.__db = self.__get_database()
        pass
    
    def __get_database(self):
        CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
        client = MongoClient(CONNECTION_STRING)
        return client[os.getenv("DATABASE")]

    def findAnItem(self):
        coll = self.__db["items"]
        x = coll.find_one(None, {'_id': 0})
        x = jsonable_encoder(x)
        return JSONResponse(content=x)

    def getItemById(self, id):
        coll = self.__db["items"]
        x = coll.find_one({"id": id}, {'_id': 0})
        x = jsonable_encoder(x)
        return JSONResponse(content=x)
    
    def getRandomItem(self):
        coll = self.__db["items"]
        random_item = coll.aggregate([{ '$sample': { 'size': 1 } },{'$project':{'_id':0}}]).next()
        return JSONResponse(content=random_item)