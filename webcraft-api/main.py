from fastapi import FastAPI
from fastapi.responses import JSONResponse
from service.save import Save
from service.item import Item
from service.recipe import Recipe

from fastapi.middleware.cors import CORSMiddleware
from models.CraftingTable import CraftingTable as CraftingTableModel

from models.Save import Save as SaveModel


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def route():
    return {"message": "Welcome to WebCraft API"}


@app.get("/user/{user_id}/saves")
async def get_user_saves(user_id):
    return JSONResponse(content=Save.getUserSaves(user_id))


@app.get("/user/{user_id}/inventory/{inventory_id}")
async def get_user_inventory(user_id, inventory_id):
    return Save.getInventory(user_id, inventory_id)


@app.post("/user/inventory/create")
async def create_inventory(inventory: SaveModel):
    return Save.createInventory(inventory.owner_id, inventory.name, inventory.date)


@app.delete("/save/{save_id}/delete")
async def delete_save(save_id):
    return Save.deleteSave(save_id)


@app.patch("/save/rename")
async def rename_save(save: SaveModel):
    return Save.renameSave(save.save_id, save.name)


@app.get("/item/random")
async def get_random_item():
    return JSONResponse(content=Item.getRandomItem())


@app.patch("/inventory/save")
async def save_inventory(inventory: SaveModel):
    return Save.saveInventory(inventory.save_id, inventory.items, inventory.date)


@app.post("/recipe/result")
async def get_recipe_result_from_crafting_table(craftingTable: CraftingTableModel):
    return JSONResponse(content=Recipe.getRecipeResult(craftingTable.ingredients))
