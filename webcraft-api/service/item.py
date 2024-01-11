from mongo import *
from fastapi import FastAPI, HTTPException

def getRandomItem(db: Mongo):
    item = db.getRandomItem()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return JSONResponse(content=item)