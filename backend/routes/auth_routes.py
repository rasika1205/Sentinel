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
    email = "abc@gmail.com"   
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing username, email, or password"}), 400

    # Check if username or email already exists
    if col_users().find_one({"username": username}) or col_users().find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    #  Use your User class to build the document
    new_user = User(username=username, email=email, password_hash=hashed_pw)

    # Insert into DB
    col_users().insert_one(new_user.to_dict())

    return jsonify({"message": "User created successfully"}), 201




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


