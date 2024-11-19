from flask import current_app
from app.models.user import User

class AuthController:
    def __init__(self):
        self.user_model = User(current_app.db)
    
    def login(self, data):
        user = self.user_model.find_by_email(data['email'])
        
        if user and self.user_model.verify_password(user['password'], data['password']):
            return self.user_model.to_json(user), 200
        return {'error': 'Invalid credentials'}, 401
    
    def register(self, data):
        if self.user_model.find_by_email(data['email']):
            return {'error': 'Email already exists'}, 400
            
        user = self.user_model.create(data)
        return self.user_model.to_json(user), 201
    
    def google_auth(self, data):
        user = self.user_model.find_by_email(data['email'])
        
        if not user:
            user = self.user_model.create({
                'email': data['email'],
                'name': data.get('name', ''),
                'image': data.get('image'),
                'google_auth': True
            })
            
        return self.user_model.to_json(user), 200