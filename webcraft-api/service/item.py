from models.Item import Item as ItemModel

class Item:
    @staticmethod
    def getRandomItem():
        return ItemModel.getRandomItem()