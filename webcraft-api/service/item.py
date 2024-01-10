from mongo import *
from random import *

def getRandomItem():
    db = Mongo()
    return db.getRandomItem()


def deleteItem(item_id: str, inventory_id: str, amount: int):
    return {"message": "delete item with item id"}