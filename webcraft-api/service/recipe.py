from mongo import *

def getRecipe(ingredients):
    db = Mongo()
    return db.getRecipesByIngredientsId(ingredients)
