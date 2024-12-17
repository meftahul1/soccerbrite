import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
    DATABASE_URI = os.getenv("DATABASE_URI")
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'user_auth_db')