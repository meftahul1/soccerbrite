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
            user = self.user_model.create_user(first_name, last_name, email, password)
            if user:
                return jsonify({"message": "User created successfully"}), 201
            return jsonify({"error": "Email already exists"}), 400

        @self.app.route('/api/login', methods=['POST'])
        def login():
            data = request.json
            email = data.get("email")
            password = data.get("password")
            user = self.user_model.find_user(email)
            if user and self.user_model.check_password(user['password'], password):
                session['isLogin'] = True
                session['email'] = user['email']
                return jsonify({"message": "Login successful", "status": "success"}), 201
            return jsonify({"error": "Invalid email or password", "status":"error"}), 400
