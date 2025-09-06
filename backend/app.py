import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

load_dotenv()

from routes.auth_routes import auth_bp
from routes.dashboard_routes import performance_bp
from routes.suggestions_routes import suggestions_bp
from routes.chatbot_routes import chatbot_bp
from models import init_db

def create_app():
    app = Flask(__name__)
    app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
    CORS(app, resources={r"/*": {"origins": "*"}})
    init_db(app)
    jwt = JWTManager(app)

    app.register_blueprint(auth_bp,url_prefix='/auth')
    app.register_blueprint(performance_bp)
    app.register_blueprint(suggestions_bp)
    app.register_blueprint(chatbot_bp, url_prefix='/chatbot')

    @app.route('/')
    def home():
        return jsonify({'ok': True, 'service': 'Project Sentinel API (updated)'})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=8000, debug=True)
