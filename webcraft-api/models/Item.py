from random import randint
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
            Item.getRandomItemRandomQuantity(item, item["stackSize"])
            return item
        return Item.getRandomItem()
    
    def getRandomItemRandomQuantity(item, itemStackSize):
        if itemStackSize > 16:
            item["quantity"] = randint(1, int(itemStackSize / 6))
        else:
            item["quantity"] = randint(1, round(itemStackSize/2))
        return 
