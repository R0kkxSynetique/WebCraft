from pydantic import BaseModel

from mongo import mongo

from models.Recipe import Recipe


class Item(BaseModel):
    def getItemById(itemId):
        coll = mongo.db["items"]
        item = coll.find_one({"id": int(itemId)}, {"_id": 0})
        return item

    def getRandomItem():
        coll = mongo.db["items"]
        item = coll.aggregate(
            [{"$sample": {"size": 1}}, {"$project": {"_id": 0}}]
        ).next()
        if Recipe.isRequiredForACraft(item["id"]):
            return item
        return Item.getRandomItem()