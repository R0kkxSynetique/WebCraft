from mongo import *

def getRandomItem():
    db = get_database()
    return findAnItem(db, "itemsList")

def deleteItem(item_id: str, inventory_id: str, amount: int):
    return {"message": "delete item with item id"}