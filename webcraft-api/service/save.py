from mongo import *
from fastapi import FastAPI, HTTPException


def getSave(inventory_id: str, db: Mongo):
    print(inventory_id)
    save = db.getSaveById(inventory_id)
    if not save:
        raise HTTPException(status_code=404, detail="Save not found")
    return JSONResponse(content=save)

def postSave(inventory_id, inventory):
    db = Mongo()
    save = db.saveInventory(inventory_id, inventory)
    if not save:
        raise HTTPException(status_code=404, detail="Save not found")
    return JSONResponse(content=save)