from models.Inventory import Inventory as InventoryModel


class Inventory:
    @staticmethod
    def getInventory(user_id, inventory_id):
        return InventoryModel.getInventory(user_id, inventory_id)

    @staticmethod
    def createInventory(user_id, name: str, date: str):
        return InventoryModel.createInventory(user_id, name, date)

    @staticmethod
    def saveInventory(inventory_id, items):
        return InventoryModel.saveInventory(inventory_id, items)

    @staticmethod
    def delete(inventory_id):
        return InventoryModel.deleteInventory(inventory_id)
