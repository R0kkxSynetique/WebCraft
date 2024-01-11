from models.Inventory import Inventory as InventoryModel


class Inventory:
    @staticmethod
    def getInventory(user_id, inventory_id):
        return InventoryModel.getInventory(user_id, inventory_id)
    
    @staticmethod
    def createInventory(user_id, name: str, date: str):
        return InventoryModel.createInventory(user_id, name, date)

    @staticmethod
    def update(inventory_id, name: str, date: str):
        return InventoryModel.updateInventory(inventory_id, name, date)

    @staticmethod
    def delete(inventory_id):
        return InventoryModel.deleteInventory(inventory_id)
