from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, db):
        self.collection = db.users
    
    def create(self, data):
        user = {
            'email': data['email'],
            'password': generate_password_hash(data['password']) if 'password' in data else None,
            'name': data['name'],
            'image': data.get('image', None),
            'google_auth': data.get('google_auth', False),
            'created_at': datetime.now(datetime.timezone.utc)
        }
        result = self.collection.insert_one(user)
        user['_id'] = result.inserted_id
        return user
    
    def find_by_email(self, email):
        return self.collection.find_one({'email': email})
    
    def verify_password(self, stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
    
    def to_json(self, user):
        return {
            'id': str(user['_id']),
            'email': user['email'],
            'name': user['name'],
            'image': user.get('image')
        }
