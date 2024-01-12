from fastapi import HTTPException
from models.Recipe import Recipe as RecipeModel
from models.Item import Item as ItemModel


class Recipe:
    @staticmethod
    def transform_array(ingredients):
        final_array = []

        for line in ingredients:
            if any(item is not None for item in line):
                final_array.append(line)

        if len(final_array) == 0:
            return final_array

        column1 = all(line[0] is None for line in final_array)
        column2 = all(line[1] is None for line in final_array)
        column3 = all(line[2] is None for line in final_array)

        if column1:
            for line in final_array:
                line.pop(0)

        if column2 and column1:
            for line in final_array:
                line.pop(0)

        if column2 and column3:
            for line in final_array:
                line.pop(1)

        if column3 and column2 and column1:
            for line in final_array:
                line.pop(0)

        if column3 and column2 and not column1:
            for line in final_array:
                line.pop(1)

        if column3 and not column2 and column1:
            for line in final_array:
                line.pop(1)

        if column3 and not column2 and not column1:
            for line in final_array:
                line.pop(2)
        return final_array

    @staticmethod
    def getRecipeResult(ingredients):
        ingredients = Recipe.transform_array(ingredients)

        ingredients_id = []
        for line in ingredients:
            for item in line:
                if item is not None:
                    ingredients_id.append(item)

        recipe = RecipeModel.getRecipeResultByIngredientsId(ingredients_id)

        if not recipe:
            recipe = RecipeModel.getRecipeResultByIngredientsId(ingredients)

        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")

        item = ItemModel.getItemById(recipe["id"])
        item["quantity"] = recipe["count"]
        return item
