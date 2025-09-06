import os, hashlib, datetime as dt
from flask_pymongo import PyMongo
from typing import Dict, Any, List
from dataclasses import dataclass, asdict

mongo = PyMongo()

def init_db(app):
    mongo.init_app(app)

def hash_user(team_id: str, user_id: str) -> str:
    salt = os.environ.get('TEAM_SALT', 'demo-salt')
    return hashlib.sha256(f"{salt}:{team_id}:{user_id}".encode()).hexdigest()

def col_users():
    return mongo.db.users

def col_messages():
    return mongo.db.employee_chats


# -------------------------------
# User Collection
# -------------------------------
class User:
    def __init__(self, username: str, password_hash: str, email: str):
        self.username = username
        self.password_hash = password_hash
        self.email = email
        self.created_at = dt.datetime.utcnow()

    def to_dict(self):
        return {
            "username": self.username,
            "password_hash": self.password_hash,
            "email": self.email,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            username=data.get("username"),
            password_hash=data.get("password_hash"),
            email=data.get("email")
        )


# -------------------------------
# Team Collection
# -------------------------------
class Team:
    def __init__(self, teamid: str, name: str, members: List[Dict], scores: List[Dict]):
        self.teamid = teamid
        self.name = name
        self.members = members or []
        self.scores = scores or []

    def to_dict(self):
        return {
            "teamid": self.teamid,
            "name": self.name,
            "members": self.members,
            "scores": self.scores
        }


# Example `scores` item:
# {
#   "score": 78,
#   "participation": 0.85,
#   "engagement": 0.72,
#   "created_at": dt.datetime.utcnow()
# }


# -------------------------------
# Employee Chat Collection
# -------------------------------
class EmployeeChat:
    def __init__(self, teamid: str, user: str, text: str, created_at=None):
        self.teamid = teamid
        self.user = user
        self.text = text
        self.created_at = created_at or dt.datetime.utcnow()

    def to_dict(self):
        return {
            "teamid": self.teamid,
            "user": self.user,
            "text": self.text,
            "created_at": self.created_at
        }


# -------------------------------
# Factory Helpers
# -------------------------------
def create_team(teamid: str, name: str, members: List[str]) -> Team:
    members_data = [{"name": m, "joined_at": dt.datetime.utcnow()} for m in members]
    return Team(teamid=teamid, name=name, members=members_data, scores=[])

def create_chat(teamid: str, user: str, text: str) -> EmployeeChat:
    return EmployeeChat(teamid=teamid, user=user, text=text)

# -------------------------------
# Export classes
# -------------------------------
__all__ = ["User", "Team", "EmployeeChat", "mongo", "init_db", "col_users", "col_messages"]
