from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, mongo):
        self.db = mongo.myDatabase.users

    def create_user(self, first_name, last_name, email, password):
        if self.db.find_one({"email": email}):
            return None
        password_hash = generate_password_hash(password)
        user = {
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password_hash
        }
        self.db.insert_one(user)
        return user

    def find_user(self, email):
        return self.db.find_one({"email": email})

    def check_password(self, stored_password, password):
        return check_password_hash(stored_password, password)
