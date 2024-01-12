from models.Save import Save as SaveModel


class Save:
    @staticmethod
    def postSave(inventory_id, inventory):
        return SaveModel.saveInventory(inventory_id, inventory)

    @staticmethod
    def getUserSaves(user_id):
        return SaveModel.getUserSavesWithoutItems(user_id)

    @staticmethod
    def deleteSave(save_id):
        return SaveModel.deleteSave(save_id)

    @staticmethod
    def renameSave(save_id, name):
        return SaveModel.renameSave(save_id, name)

    @staticmethod
    def getInventory(user_id, inventory_id):
        return SaveModel.getInventory(user_id, inventory_id)

    @staticmethod
    def createInventory(user_id, name: str, date: str):
        return SaveModel.createInventory(user_id, name, date)

    @staticmethod
    def saveInventory(inventory_id, items):
        return SaveModel.saveInventory(inventory_id, items)

    @staticmethod
    def delete(inventory_id):
        return SaveModel.deleteInventory(inventory_id)
