from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_pymongo import MongoClient

app = Flask(__name__)
CORS(app)

app.secret_key = "secret_key"
client = MongoClient("mongodb+srv://<user>:<password>@<address>/?retryWrites=true&w=majority&appName=<cluster>")
mongo = client.myDatabase
db = mongo.users

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    firstName = data.get("firstName")
    lastName = data.get("lastName")
    email = data.get("email")
    password = data.get("password")
    # check if email exists
    if db.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400
    # store in database
    db.insert_one({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    })
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user = db.find_one({"email": email})
    pw = db.find_one({"password": password})
    if user and pw:
        # Store user info in session
        session['isLogin'] = True
        session['email'] = user['email']
        return jsonify({"message": "Login successful"})
    return jsonify({"error": "Invalid email or password"}), 400

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)
