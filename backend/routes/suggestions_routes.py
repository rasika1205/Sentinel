from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required
import google.generativeai as genai
from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client["sentinel_db"]
suggestions_bp = Blueprint('suggestions', __name__)

@suggestions_bp.route('/api/performance/suggestions', methods=["GET"])
def get_suggestions():
    team = db.teams.find_one({"teamId": "T001"})
    if not team:
        return jsonify({"error": "Team not found"}), 404

    scores = team.get("performance", {}).get("scores", [])
    if not scores:
        return jsonify({"error": "No scores available"}), 404

    latest_score = scores[-1]["score"]
    participation = scores[-1].get("participation", 0)
    engagement = scores[-1].get("engagement", 0)

    # Build prompt for Gemini
    prompt = f"""
    You are an HR consultant AI. The team has the following stats:
    - Latest psychological safety score: {latest_score}
    - Participation: {participation}
    - Engagement: {engagement}

    Suggest **exactly 2 actionable HR recommendations** to improve team performance and psychological safety. 
    Return the output **strictly in valid JSON array** format compatible with this frontend. 
    Each suggestion must have:

    - id (unique integer),
    - title (string),
    - description (string),
    - category (one of Communication, Recognition, Team Development, Learning Culture, Goal Setting, Work-Life Balance),
    - priority (high, medium, low),
    - impact (string, e.g., "Improves collaboration by 35%"),
    - timeToImplement (string, e.g., "2 weeks"),
    - icon (one of Users, Lightbulb, Target, MessageSquare, Award, Calendar),
    - color (string, e.g., "text-warning"),
    - actionItems (array of 4 strings).

    Example output:

    [
    {{
        "id": 1,
        "title": "Example Title",
        "description": "Example description.",
        "category": "Team Development",
        "priority": "high",
        "impact": "Improves collaboration by 40%",
        "timeToImplement": "2 weeks",
        "icon": "Users",
        "color": "text-destructive",
        "actionItems": [
        "Action 1",
        "Action 2",
        "Action 3",
        "Action 4"
        ]
    }},
    {{
        "id": 2,
        "title": "Another Title",
        "description": "Another description.",
        "category": "Learning Culture",
        "priority": "medium",
        "impact": "Reduces fear of failure by 30%",
        "timeToImplement": "1 week",
        "icon": "Lightbulb",
        "color": "text-warning",
        "actionItems": [
        "Action A",
        "Action B",
        "Action C",
        "Action D"
        ]
    }}
    ]
    """


    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    try:
        ai_suggestions = json.loads(response.text)
  # Gemini returns JSON-like text
    except:
        ai_suggestions = []

    # Static fallback suggestions (for suggestions 3–6)
    static_suggestions = [
        {
            "id": 3,
            "title": "Team Building Workshops",
            "description": "Organize interactive workshops focused on building trust, improving communication, and understanding individual working styles.",
            "category": "Team Development",
            "priority": "medium",
            "impact": "Improves collaboration by 35%",
            "timeToImplement": "3-4 weeks",
            "icon": "Users",
            "color": "text-warning",
            "actionItems": [
                "Assess team dynamics",
                "Design custom workshop agenda",
                "Book external facilitator",
                "Plan follow-up activities"
            ]
        },
        {
            "id": 4,
            "title": "Failure Learning Sessions",
            "description": "Host monthly sessions where team members share mistakes and learnings in a safe, constructive environment.",
            "category": "Learning Culture",
            "priority": "medium",
            "impact": "Reduces fear of failure by 50%",
            "timeToImplement": "1 week",
            "icon": "Lightbulb",
            "color": "text-primary",
            "actionItems": [
                "Create safe sharing guidelines",
                "Schedule monthly sessions",
                "Develop story templates",
                "Celebrate learning outcomes"
            ]
        },
        {
            "id": 5,
            "title": "Goal Alignment Workshops",
            "description": "Conduct quarterly sessions to ensure individual goals align with team objectives and provide clarity on expectations.",
            "category": "Goal Setting",
            "priority": "medium",
            "impact": "Increases clarity by 45%",
            "timeToImplement": "2 weeks",
            "icon": "Target",
            "color": "text-success",
            "actionItems": [
                "Review current goal framework",
                "Facilitate alignment sessions",
                "Create tracking dashboard",
                "Establish review cadence"
            ]
        },
        {
            "id": 6,
            "title": "Flexible Work Hours",
            "description": "Implement flexible scheduling options to accommodate different work styles and personal needs, building trust and autonomy.",
            "category": "Work-Life Balance",
            "priority": "low",
            "impact": "Improves satisfaction by 30%",
            "timeToImplement": "1-2 weeks",
            "icon": "Calendar",
            "color": "text-muted-foreground",
            "actionItems": [
                "Draft flexible work policy",
                "Define core collaboration hours",
                "Set up time tracking system",
                "Monitor team productivity"
            ]
        }
    ]

    return jsonify(ai_suggestions + static_suggestions)