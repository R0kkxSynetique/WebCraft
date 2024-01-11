from models.Recipe import Recipe as RecipeModel

class Recipe:
    @staticmethod
    def getRecipe(ingredients):
        return RecipeModel.getRecipesByIngredientsId(ingredients)
