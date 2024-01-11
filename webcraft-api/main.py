from fastapi import FastAPI
from service.save import Save
from service.item import Item
from service.recipe import Recipe
from service.inventory import Inventory

from models.CraftingTable import CraftingTable as CraftingTableModel
from models.Inventory import Inventory as InventoryModel


app = FastAPI()


@app.get("/user/{user_id}/saves")
async def get_user_saves(user_id):
    return Save.getUserSaves(user_id)


@app.get("/user/{user_id}/inventory/{inventory_id}")
async def get_user_inventory(user_id, inventory_id):
    return Inventory.getInventory(user_id, inventory_id)


@app.post("/user/{owner_id}/inventory")
async def create_inventory(inventory: InventoryModel):
    return Inventory.createInventory(inventory.owner_id, inventory.name, inventory.date)


@app.delete("/save/{save_id}")
async def delete_save(save_id):
    return Save.deleteSave(save_id)


@app.get("/item/random")
async def get_random_item():
    return Item.getRandomItem()


# @app.post("/recipe")
# async def create_Recipe(craftingTable: CraftingTableModel):
#     return Recipe.getRecipe(craftingTable.ingredients)


# @app.patch("/inventory/{inventory_id}")
# async def update_inventory(inventory_id, inventory: InventoryModel):
#     return Inventory.update(inventory_id, inventory.name, inventory.date)


# @app.delete("/inventory/{inventory_id}")
# async def delete_inventory(inventory_id):
#     return Inventory.delete(inventory_id)
