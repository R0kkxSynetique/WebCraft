from models.Save import Save as SaveModel
from fastapi import HTTPException


class Save:

    @staticmethod
    def getUserSaves(user_id):
        saves = SaveModel.getUserSavesWithoutItems(user_id)
        if not saves:
            raise HTTPException(status_code=404, detail="Saves not found")
    

    @staticmethod
    def deleteSave(save_id):
        return SaveModel.deleteSave(save_id)

    @staticmethod
    def renameSave(save_id, name):
        return SaveModel.renameSave(save_id, name)

    @staticmethod
    def getInventory(user_id, inventory_id):
        save = SaveModel.getInventory(user_id, inventory_id)
        if not save:
            raise HTTPException(status_code=404, detail="Save not found")
        return save

    @staticmethod
    def createInventory(user_id, name: str, date: str):
        return SaveModel.createInventory(user_id, name, date)

    @staticmethod
    def saveInventory(inventory_id, items, date):
        return SaveModel.saveInventory(inventory_id, items, date)
