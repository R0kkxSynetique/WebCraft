from itertools import permutations
from pydantic import BaseModel

from mongo import mongo


class Recipe(BaseModel):
    def getRecipeResultByIngredientsId(ingredients):
        is_nested = True
        if not any(isinstance(i, list) for i in ingredients):
            is_nested = False
        coll = mongo.db["recipes"]
        if is_nested:
            recipe = coll.find_one(
                {"inShape": ingredients},
                {"_id": 0},
            )
        elif not is_nested:
            for permutation in list(map(list, set(map(tuple, permutations(ingredients))))):
                recipe = coll.find_one(
                    {"ingredients": permutation},
                    {"_id": 0},
                )
                if recipe:
                    break
        if recipe:
            return recipe["result"]
        return False

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
