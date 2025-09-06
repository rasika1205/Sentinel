from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity
import google.generativeai as genai
from pymongo import MongoClient
import os
import statistics
import json

performance_bp = Blueprint("performance", __name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["sentinel_db"]
teams_collection = db["teams"]
employee_chats_collection = db["employee_chats"]

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

@performance_bp.route("/api/performance/scorecard", methods=["GET","POST"])
#@jwt_required()
def get_scorecard():
    team_id = "T001"
    team = teams_collection.find_one({"teamId": team_id})
    
    if not team:
        return jsonify({"error": "Team not found"}), 404

    scores = team.get("performance", {}).get("scores", [])
    if not scores:
        return jsonify({"error": "No scores available"}), 404

    chats_cursor = employee_chats_collection.find({"teamId": team_id})
    chats = [c["text"] for c in chats_cursor]

    if not chats:
        return jsonify({"error": "No chats found for this team"}), 404

    chat_text = "\n".join(chats)
    prompt = f"""
    You are analyzing team performance chats.
    Based on the following chat transcripts, assign a latest Psychological Safety Score 
    between 0 and 100 for the team.
    - Positive and engaging chats → higher score.
    - Neutral/less engaging → medium score.
    - Negative/toxic → lower score.

    Consider positivity, collaboration, engagement, and productivity in the conversation. 
    Just return a single number (integer). 

    Chats:
    {chat_text}
    """

    response = model.generate_content(prompt)
    try:
        latest_score = int(response.text.strip())
    except (ValueError, AttributeError):
        latest_score = scores[-1]["score"] if scores else 0

    previous_score = scores[-2]["score"] if len(scores) > 1 else latest_score
    avg_participation = statistics.mean(s.get("participation", 0) for s in scores) if scores else 0
    team_size = len(team.get("members", []))
    avg_rating = round(statistics.mean(s.get("engagement", 0) for s in scores) * 5, 1) if scores else 0

    return jsonify({
        "score": latest_score,
        "previous_score": previous_score,
        "participation": round(avg_participation * 100, 2),
        "team_size": team_size,
        "avg_rating": avg_rating
    })

@performance_bp.route("/api/team/performance/weekly", methods=["GET"])
#@jwt_required()
def get_weekly_performance():
    team_id = "T001"
    team = teams_collection.find_one({"teamId": team_id})
    if not team:
        return jsonify([]), 200

    scores = team.get("performance", {}).get("scores", [])
    weekly_data = [
        {
            "name": f"Day {i+1}",
            "score": s.get("score", 0),
            "participation": round(s.get("participation", 0) * 100),
            "engagement": round(s.get("engagement", 0) * 100),
        }
        for i, s in enumerate(scores)
    ]

    return jsonify(weekly_data)

@performance_bp.route("/api/performance/summary", methods=["GET"])
#@jwt_required()
def get_team_summary():
    team_id = "T001"
    team = teams_collection.find_one({"teamId": team_id})
    if not team:
        return jsonify({"error": "Team not found"}), 404

    chats_cursor = employee_chats_collection.find({"teamId": team_id})
    chats = [c["text"] for c in chats_cursor]
    if not chats:
        return jsonify({"error": "No chats found"}), 404

    chat_text = "\n".join(chats)
    prompt = f"""
    You are an expert in organizational psychology. Analyze the following team chat transcripts
    and provide a structured summary about team performance and team's mental state of mind in JSON format.

    Chats:
    {chat_text}

    Return JSON in this exact format:
    {{
        "title": "string", 
        "description": "string", 
        "highlights": ["point1", "point2", "point3", "point4"],
        "sentiment": "excellent | good | needs-attention",
        "action_item": "string"
    }}
    """

    response = model.generate_content(prompt)
    try:
        # Clean the response text to ensure it's valid JSON
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "")
        summary_data = json.loads(cleaned_text)
    except (json.JSONDecodeError, AttributeError):
        return jsonify({"error": "Failed to parse AI response"}), 500

    return jsonify(summary_data)

def analyze_sentiment(text):
    prompt = f"""
    Analyze the sentiment of the following chat message and return only one word:
    Positive, Negative, or Neutral.

    Chat: "{text}"
    """
    try:
        response = model.generate_content(prompt)
        sentiment = response.text.strip().lower()
        if "positive" in sentiment:
            return "positive"
        elif "negative" in sentiment:
            return "negative"
        else:
            return "neutral"
    except Exception:
        return "neutral"

@performance_bp.route("/api/performance/synchronous", methods=["GET"])
#@jwt_required()
def get_synchronous_data():
    team_id = "T001"
    team = teams_collection.find_one({"teamId": team_id})
    if not team:
        return jsonify({"error": "Team not found"}), 404

    scores = team.get("performance", {}).get("scores", [])
    today_score = scores[-1]["score"] if scores else None

    chats_cursor = employee_chats_collection.find(
        {"teamId": team_id},
        sort=[("created_at", -1)],
        limit=10
    )
    
    recent_activities = []
    for chat in chats_cursor:
        sentiment = analyze_sentiment(chat.get("text", ""))
        recent_activities.append({
            "time": chat.get("created_at").strftime("%I:%M %p") if chat.get("created_at") else "",
            "user": chat.get("memberId", "Unknown"),
            "action": chat.get("message", ""),
            "sentiment": sentiment
        })

    return jsonify({
        "todayScore": today_score,
        "recentActivities": recent_activities
    })
