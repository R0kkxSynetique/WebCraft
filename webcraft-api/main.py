from fastapi import FastAPI
from service.get_save import getSave

app = FastAPI()


@app.get("/")
async def route1():
    return {"message": "Hello to Webcraft API!"}

@app.get("/save/{inventory_id}")
async def route2():
    return {"message": "get save content with save id"}

@app.post("/save/{inventory_id}")
async def route3(inventory: str):
    return {"message": "save to json on body"}

@app.get("/item/random")
async def route():
    return {"message": "get random item"}

@app.post("/recipe")
async def route(craftingTable: str):
    return {"message": "get recipe with json on body and return item id crafted"}

@app.get("/inventory/{user_id}")
async def route():
    return {"message": "get all inventory with user id"}

@app.post("/inventory/{user_id}/create")
async def route(name: str):
    return {"message": "create inventory with user id on body"}

@app.patch("/inventory/{inventory_id}")
async def route(name: str):
    return {"message": "rename inventory with name on body"}

@app.delete("/inventory/{inventory_id}")
async def route():
    return {"message": "delete inventory with inventory id"}

@app.delete("/item/{item_id}/{inventory_id}/{amount}")
async def route():
    return {"message": "delete item with item id and amount on inventory id"}