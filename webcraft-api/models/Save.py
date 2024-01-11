from pydantic import BaseModel

class Save(BaseModel):
    save_id: str
    items: list