from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
import datetime as dt
from models import User, col_users

auth_bp = Blueprint("auth", __name__)

# --- SIGNUP ---
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    print(data)

    username = data.get("username")
    email = "abc@gmail.com"   # ✅ take from request now (not hardcoded)
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing username, email, or password"}), 400

    # Check if username or email already exists
    if col_users().find_one({"username": username}) or col_users().find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # ✅ Use your User class to build the document
    new_user = User(username=username, email=email, password_hash=hashed_pw)

    # Insert into DB
    col_users().insert_one(new_user.to_dict())

    return jsonify({"message": "User created successfully"}), 201


# # --- LOGIN ---
# @auth_bp.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"error": "Missing username or password"}), 400

#     user = col_users().find_one({"username": username})
#     if not user:
#         return jsonify({"error": "Invalid credentials"}), 401

#     # Check password
#     if not bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
#         return jsonify({"error": "Invalid credentials"}), 401

#     # Create JWT
#     access_token = create_access_token(identity=username)

#     return jsonify({
#         "access_token": access_token,
#         "username": username,
#         "email": user["email"]
#     }), 200

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    # Find user
    user_doc = col_users().find_one({"username": username})
    if not user_doc:
        return jsonify({"error": "Invalid credentials"}), 401

    # Reconstruct User object
    user = User.from_dict(user_doc)

    # Check password
    if not bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
        return jsonify({"error": "Invalid credentials"}), 401

    # Create JWT token
    access_token = create_access_token(identity=username)

    return jsonify({
        "access_token": access_token,
        "username": user.username,
        "email": user.email
    }), 200


# from flask import Flask, request, jsonify
# from flask_pymongo import PyMongo
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from datetime import datetime
# from bson import ObjectId
# import os


# app = Flask(__name__)
# auth_bp = Blueprint('auth', __name__)
# # MongoDB connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/sentinel_db"
# mongo = PyMongo(app)
# users_col = mongo.db.users

# # JWT secret key
# app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
# jwt = JWTManager(app)

# # Bcrypt for password hashing
# bcrypt = Bcrypt(app)


# # -------- SIGNUP --------
# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"error": "Username and password are required"}), 400

#     # Check if user exists
#     if users_col.find_one({"username": username}):
#         return jsonify({"error": "User already exists"}), 409

#     # Hash password
#     hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

#     user = {
#         "username": username,
#         "password": hashed_pw,
#         "created_at": datetime.utcnow()
#     }

#     result = users_col.insert_one(user)

#     # Create JWT token
#     access_token = create_access_token(identity=str(result.inserted_id))

#     return jsonify({
#         "msg": "User created successfully",
#         "token": access_token
#     }), 201


# # -------- LOGIN --------
# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     user = users_col.find_one({"username": username})
#     if not user:
#         return jsonify({"error": "Invalid username or password"}), 401

#     if not bcrypt.check_password_hash(user["password"], password):
#         return jsonify({"error": "Invalid username or password"}), 401

#     access_token = create_access_token(identity=str(user["_id"]))

#     return jsonify({
#         "msg": "Login successful",
#         "token": access_token
#     }), 200


# # -------- PROTECTED ROUTE EXAMPLE --------
# @app.route("/dashboard", methods=["GET"])
# @jwt_required()
# def dashboard():
#     current_user = get_jwt_identity()
#     return jsonify({"msg": f"Welcome user {current_user}"}), 200


# if __name__ == "__main__":
#     app.run(debug=True)
