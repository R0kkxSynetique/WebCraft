from pydantic import BaseModel

from mongo import mongo


class Recipe(BaseModel):
    def getRecipeResultByIngredientsId(ingredients):
        coll = mongo.db["recipes"]
        recipe = coll.find_one(
            {"$or": [{"inShape": ingredients}, {"ingredients": {"$in": ingredients}}]},
            {"_id": 0},
        )
        if recipe is None:
            return
        return recipe["result"]

    def isRequiredForACraft(itemId):
        coll = mongo.db["recipes"]
        recipe = coll.find_one(
            {
                "$or": [
                    {"inShape": {"$elemMatch": {"$elemMatch": {"$eq": itemId}}}},
                    {"ingredients": {"$in": [[itemId]]}},
                ]
            },
            {"_id": 0},
        )
        return recipe
