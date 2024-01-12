import os

from dotenv import load_dotenv, find_dotenv

from pymongo import MongoClient


class _Mongo:
    db = None

    def __init__(self):
        load_dotenv(find_dotenv())
        self.db = self.__get_database()
        pass

    def __get_database(self):
        CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
        client = MongoClient(CONNECTION_STRING)
        return client[str(os.getenv("DB_NAME"))]


mongo = _Mongo()
