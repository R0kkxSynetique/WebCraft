from models.Recipe import Recipe as RecipeModel
from models.Item import Item as ItemModel
from fastapi import HTTPException

class Recipe:
    @staticmethod
    def getRecipeResult(ingredients):
        print (ingredients)
        recipe = RecipeModel.getRecipeResultByIngredientsId(ingredients)
        print (recipe)
        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")
        return ItemModel.getItemById(recipe["id"])
