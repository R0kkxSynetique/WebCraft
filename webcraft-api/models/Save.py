from bson import ObjectId
from pydantic import BaseModel

from fastapi.encoders import jsonable_encoder
from mongo import mongo


class Save(BaseModel):
    save_id: str
    items: list

    def getUserSavesWithoutItems(userId):
        coll = mongo.db["inventories"]
        saves = coll.find({"owner_id": userId}, {"_id": 1, "name": 1, "date": 1})
        saves = list(saves)
        formattedSaves = []
        for save in saves:
            save["id"] = str(save["_id"])
            save.pop("_id")
            formattedSaves.append(save)
        return jsonable_encoder(formattedSaves)

    def deleteSave(saveId):
        coll = mongo.db["inventories"]
        obj_id = ObjectId(saveId)
        res = coll.delete_one({"_id": obj_id})
        return res.deleted_count
