from pydantic import BaseModel

class Inventory(BaseModel):
    name: str
    date: str