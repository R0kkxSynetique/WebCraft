from pydantic import BaseModel

from fastapi.encoders import jsonable_encoder

from mongo import mongo


class Item(BaseModel):
    def getItemById(self, id):
        coll = mongo.db["items"]
        item = coll.find_one({"id": id}, {"_id": 0})
        return jsonable_encoder(item)

    def getRandomItem():
        coll = mongo.db["items"]
        return coll.aggregate(
            [{"$sample": {"size": 1}}, {"$project": {"_id": 0}}]
        ).next()
