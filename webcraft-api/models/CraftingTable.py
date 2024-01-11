from pydantic import BaseModel


class CraftingTable(BaseModel):
    ingredients: list
