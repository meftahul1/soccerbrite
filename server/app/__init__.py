from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)
    
    client = MongoClient(app.config['MONGODB_URI'])
    app.db = client[app.config['DATABASE_NAME']]
    
    with app.app_context():
        from app.views.auth import auth_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    return app