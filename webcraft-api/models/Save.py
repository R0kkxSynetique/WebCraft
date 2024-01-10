from pydantic import BaseModel

class Save(BaseModel):
    inventory_id: str
    items: list