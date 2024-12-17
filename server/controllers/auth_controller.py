from flask import jsonify, request, session
from models.user import User

class AuthController:
    def __init__(self, app, mongo):
        self.user_model = User(mongo)
        self.app = app
        self.account()

    def account(self):
        @self.app.route('/api/register', methods=['POST'])
        def signup():
            data = request.json
            first_name = data.get("firstName")
            last_name = data.get("lastName")
            email = data.get("email")
            password = data.get("password")
            old_user = self.user_model.find_user(email)
            if old_user:
                return jsonify({"error": "Email already exists"}), 400 
            else:
                user = self.user_model.create_user(first_name, last_name, email, password)
                return jsonify({"message": "User created successfully"}), 201

        @self.app.route('/api/login', methods=['POST'])
        def login():
            data = request.json
            email = data.get("email")
            password = data.get("password")
            user = self.user_model.find_user(email)
            if user and self.user_model.check_password(user['password'], password):
                return jsonify({"message": "Login successful", "status": "success"}), 201
            return jsonify({"error": "Invalid email or password", "status":"error"}), 400
        
        
        @self.app.route('/api/google-login', methods=['POST'])
        def google_login():
            data = request.json
            email = data.get("email")
            name = data.get("name")
            try:
                user = self.user_model.find_user(email)
                if user:
                    return jsonify({"message": "Login successful", "status": "success"}), 201
                else:
                    first_name, last_name = name.split(" ")
                    user = self.user_model.create_user(first_name, last_name, email, "")
                    return jsonify({"message": "User created successfully", "status": "success"}), 201
            except Exception as e:
                return jsonify({"error": "Internal server error", "status":"error"}), 500
