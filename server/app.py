from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
from config import Config
from controllers.auth_controller import AuthController

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

mongo = MongoClient(app.config['DATABASE_URI'])
auth_controller = AuthController(app, mongo)

if __name__ == '__main__':
    app.run(debug=True)
