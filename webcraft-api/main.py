from typing import Union
from dotenv import load_dotenv, find_dotenv
from fastapi import FastAPI
from service.save import *
from service.item import *
from service.recipe import *
from service.inventory import *
from mongo import *


from models.Save import Save
from models.inventory import *
from models.CraftingTable import CraftingTable

load_dotenv(find_dotenv())

app = FastAPI()
db = Mongo()

@app.get("/")
async def route():
    return getRecipe([[None, 40, 39], [281, None, None], [None, None, None]])

@app.get("/save/{inventory_id}")
async def route(inventory_id):
    return getSave(inventory_id, db)

@app.post("/save/{inventory_id}")
async def create_save(save: Save):
    return postSave(save.inventory_id, save.items)

@app.get("/item/random")
async def route():
    return getRandomItem(db)

@app.post("/recipe")
async def create_Recipe(craftingTable: CraftingTable):
    return getRecipe(craftingTable.ingredients)

@app.get("/inventory/{user_id}")
async def route(user_id):
    return getAllInventory(user_id, db)

@app.post("/inventory/{user_id}/create")
async def route(user_id, inventory: Inventory):
    return createInventory(user_id, inventory.name, inventory.date, db)

@app.patch("/inventory/{inventory_id}")
async def route(inventory_id, inventory: Inventory):
    return updateInventory(inventory_id, inventory.name, inventory.date, db)

@app.delete("/inventory/{inventory_id}")
async def route(inventory_id):
    return deleteInventory(inventory_id, db)