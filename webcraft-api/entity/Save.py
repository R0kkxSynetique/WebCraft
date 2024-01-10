import json

class Save():
    id: int
    name: str | None = None
    date: str | None = None
    content: []

    def __init__(self, id: int, content: [] | str, name: str | None = None , date: str | None = None):
        self.id = id
        self.name = name
        self.date = date
        if type(content) == str:
            self.content = json.loads(content)
        else:
            self.content = content

    def getId(self):
        return self.id

    def getName(self):
        return self.name
    
    def getDate(self):
        return self.date
    
    def getContent(self):
        return self.content
    
    def getContentJson(self):
        return json.dumps(self.content)