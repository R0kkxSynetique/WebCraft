from pydantic import BaseModel


class CraftingTable(BaseModel):
    ingredients: dict

