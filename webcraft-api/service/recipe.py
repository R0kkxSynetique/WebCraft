from fastapi import HTTPException
from fastapi.responses import JSONResponse
from models.Recipe import Recipe as RecipeModel
from models.Item import Item as ItemModel


class Recipe:
    @staticmethod
    def transform_array(ingredients):
        line1 = False
        line2 = False
        line3 = False
        column1 = False
        column2 = False
        column3 = False

        if (
            ingredients[0][0] is None
            and ingredients[0][1] is None
            and ingredients[0][2] is None
        ):
            line1 = True

        if (
            ingredients[2][0] is None
            and ingredients[2][1] is None
            and ingredients[2][2] is None
        ):
            line3 = True

        if (
            ingredients[1][0] is None
            and ingredients[1][1] is None
            and ingredients[1][2] is None
        ):
            if line1 is True or line3 is True:
                line2 = True

        if (
            ingredients[0][0] is None
            and ingredients[1][0] is None
            and ingredients[2][0] is None
        ):
            column1 = True

        if (
            ingredients[0][2] is None
            and ingredients[1][2] is None
            and ingredients[2][2] is None
        ):
            column3 = True

        if (
            ingredients[0][1] is None
            and ingredients[1][1] is None
            and ingredients[2][1] is None
        ):
            if column1 is True or column3 is True:
                column2 = True

        final_array = []

        if line1 is False:
            final_array.append(ingredients[0])

        if line2 is False:
            final_array.append(ingredients[1])
        else:
            if line1 is False and line3 is False:
                final_array.append(ingredients[1])

        if line3 is False:
            final_array.append(ingredients[2])

        if column1 is True:
            try:
                final_array[0].pop(0)
                final_array[1].pop(0)
                final_array[2].pop(0)
            except:
                pass

        if column2 is True and column1 is True:
            try:
                final_array[0].pop(0)
                final_array[1].pop(0)
                final_array[2].pop(0)
            except:
                pass

        if column2 is True and column3 is True:
            try:
                final_array[0].pop(1)
                final_array[1].pop(1)
                final_array[2].pop(1)
            except:
                pass

        if column3 is True and column2 is True and column1 is True:
            try:
                final_array[0].pop(0)
                final_array[1].pop(0)
                final_array[2].pop(0)
            except:
                pass

        if column3 is True and column2 is True and column1 is False:
            try:
                final_array[0].pop(1)
                final_array[1].pop(1)
                final_array[2].pop(1)
            except:
                pass

        if column3 is True and column2 is False and column1 is True:
            try:
                final_array[0].pop(1)
                final_array[1].pop(1)
                final_array[2].pop(1)
            except:
                pass

        if column3 is True and column2 is False and column1 is False:
            try:
                final_array[0].pop(2)
                final_array[1].pop(2)
                final_array[2].pop(2)
            except:
                pass

        return final_array

    @staticmethod
    def getRecipe(ingredients):
        ingredients = Recipe.transform_array(ingredients)

        # make a liste of all ingredients id
        ingredients_id = []
        for line in ingredients:
            for item in line:
                if item is not None:
                    ingredients_id.append(item)

        # check ingredients craft
        recipe = Recipe.getRecipeResult(ingredients_id)
        if not recipe:
            recipe = Recipe.getRecipeResult(ingredients)

        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")

        return JSONResponse(content=ItemModel.getItemById(recipe["id"]))

    @staticmethod
    def getRecipeResult(ingredients):
        return RecipeModel.getRecipeResultByIngredientsId(ingredients)
