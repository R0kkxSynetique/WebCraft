import os
from pymongo import MongoClient

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

def get_database():
   CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
   client = MongoClient(CONNECTION_STRING)
   return client[os.getenv("DATABASE")]

def findAnItem(db, table):
    coll = db[table]
    x = coll.find_one(None, {'_id': 0})
    x = jsonable_encoder(x)
    return JSONResponse(content=x)