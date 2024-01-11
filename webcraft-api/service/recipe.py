from mongo import *
from fastapi import FastAPI, HTTPException


def transform_array(ingredients):
    
    line1 = False
    line2 = False
    line3 = False
    column1 = False
    column2 = False
    column3 = False

    if ingredients[0][0] == None and ingredients[0][1] == None and ingredients[0][2] == None:
        line1 = True

    if ingredients[2][0] == None and ingredients[2][1] == None and ingredients[2][2] == None:
            line3 = True

    if ingredients[1][0] == None and ingredients[1][1] == None and ingredients[1][2] == None:
        if line1 == True or line3 == True:
            line2 = True


    if ingredients[0][0] == None and ingredients[1][0] == None and ingredients[2][0] == None:
        column1 = True

    if ingredients[0][2] == None and ingredients[1][2] == None and ingredients[2][2] == None:
        column3 = True

    if ingredients[0][1] == None and ingredients[1][1] == None and ingredients[2][1] == None:
        if column1 == True or column3 == True:
            column2 = True

    final_array = []

    if line1 == False:
        final_array.append(ingredients[0])

    if line2 == False:
        final_array.append(ingredients[1])
    else:
        if line1 == False and line3 == False:
            final_array.append(ingredients[1])
    
    if line3 == False:
        final_array.append(ingredients[2])

    if column1 == True:
        try:
            final_array[0].pop(0)
            final_array[1].pop(0)
            final_array[2].pop(0)
        except:
            pass

    if column2 == True and column1 == True:
        try:
            final_array[0].pop(0)
            final_array[1].pop(0)
            final_array[2].pop(0)
        except:
            pass

    if column2 == True and column3 == True:
        try:
            final_array[0].pop(1)
            final_array[1].pop(1)
            final_array[2].pop(1)
        except:
            pass

    if column3 == True and column2 == True and column1 == True:
        try:
            final_array[0].pop(0)
            final_array[1].pop(0)
            final_array[2].pop(0)
        except:
            pass

    if column3 == True and column2 == True and column1 == False:
        try:
            final_array[0].pop(1)
            final_array[1].pop(1)
            final_array[2].pop(1)
        except:
            pass

    if column3 == True and column2 == False and column1 == True:
        try:
            final_array[0].pop(1)
            final_array[1].pop(1)
            final_array[2].pop(1)
        except:
            pass

    if column3 == True and column2 == False and column1 == False:
        try:
            final_array[0].pop(2)
            final_array[1].pop(2)
            final_array[2].pop(2)
        except:
            pass
    

    return final_array


def getRecipe(ingredients):
    db = Mongo()
    

    ingredients = transform_array(ingredients)

    # make a liste of all ingredients id
    ingredients_id = []
    for line in ingredients:
        for item in line:
            if item != None:
                ingredients_id.append(item)

    print(ingredients_id)
    print(ingredients)

    #check ingredients craft
    recipe = db.getRecipeResultByIngredientsId(ingredients_id)
    print(recipe)
    if not recipe:
        recipe = db.getRecipeResultByIngredientsId(ingredients)
    
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    return db.getItemById(recipe["id"])
    
             
                 
                 
