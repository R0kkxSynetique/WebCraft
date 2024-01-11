from pydantic import BaseModel

from fastapi.encoders import jsonable_encoder

from itertools import permutations

from mongo import mongo


class Recipe(BaseModel):
    def getRecipeById(self, id):
        coll = mongo.__db["recipes"]
        recipe = coll.find_one({str(id): {"$type": 3}}, {"_id": 0})
        return jsonable_encoder(recipe)

    def getRecipeResultByIngredientsId(self, ingredients):
        is_not_nested = False
        coll = mongo.__db["recipes"]
        cursor = coll.find({}, {"_id": 0})
        res = {}
        if not any(isinstance(i, list) for i in ingredients):
            is_not_nested = True
            all_permutations = list(permutations(ingredients))
        for document in cursor:
            for key, value in document.items():
                if "inShape" in value and value["inShape"] == ingredients:
                    res = document[key]["result"]
                elif (
                    "ingredients" in value
                    and is_not_nested
                    and tuple(value["ingredients"]) in all_permutations
                ):
                    res = document[key]["result"]
        return res
