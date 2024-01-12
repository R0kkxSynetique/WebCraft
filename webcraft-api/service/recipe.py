from models.Recipe import Recipe as RecipeModel


class Recipe:
    @staticmethod
    def getRecipeResult(ingredients):
        return RecipeModel.getRecipeResultByIngredientsId(ingredients)
