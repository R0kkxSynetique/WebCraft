from models.Save import Save as SaveModel
from models.Inventory import Inventory as InventoryModel

class Save:

    @staticmethod
    def postSave(inventory_id, inventory):
        return InventoryModel.saveInventory(inventory_id, inventory)

    @staticmethod
    def getUserSaves(user_id):
        return SaveModel.getUserSavesWithoutItems(user_id)
    
    @staticmethod
    def deleteSave(save_id):
        return SaveModel.deleteSave(save_id)