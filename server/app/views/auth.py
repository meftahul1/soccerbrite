from flask import Blueprint, request, jsonify
from app.controllers.auth_controller import AuthController

auth_bp = Blueprint('auth', __name__)
auth_controller = AuthController()

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        response, status_code = auth_controller.login(request.json)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        response, status_code = auth_controller.register(request.json)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/google', methods=['POST'])
def google_auth():
    try:
        response, status_code = auth_controller.google_auth(request.json)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500