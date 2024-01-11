from mongo import *
from fastapi import FastAPI, HTTPException

def getAllInventory(user_id, db: Mongo):
    inventory = db.getUserInventories(user_id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return 

def createInventory(user_id, name: str,date: str, db: Mongo):
    inventory =  db.createInventory(user_id, name, date)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")

def updateInventory(inventory_id, name: str, date: str, db: Mongo):
    inventory =  db.updateInventory(inventory_id, name, date)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")

def deleteInventory(inventory_id, db: Mongo):
    inventory =  db.deleteInventory(inventory_id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
