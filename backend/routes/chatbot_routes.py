from flask import Blueprint, request, jsonify

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.post('/')
def chat():
    msg = (request.get_json(force=True) or {}).get('message', '').lower()
    if 'improve' in msg or 'suggest' in msg:
        return jsonify({'reply': 'Try a 15-minute workload check and a blameless review this week.'})
    if 'hi' in msg or 'hello' in msg:
        return jsonify({'reply': 'Hello! Ask me about your team\'s wellbeing, trends, or suggestions.'})
    return jsonify({'reply': 'I\'m here to help with HR insights and team wellbeing.'})
