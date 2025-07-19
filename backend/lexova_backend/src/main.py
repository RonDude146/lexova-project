import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta

# Import blueprints
from src.routes.auth import auth_blueprint
from src.routes.users import users_blueprint
from src.routes.lawyers import lawyers_blueprint
from src.routes.cases import cases_blueprint
from src.routes.admin import admin_blueprint
from src.routes.ai_matching import ai_matching_blueprint
from src.routes.seo import register_seo_blueprint

# Initialize Flask app
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration
app.config['SECRET_KEY'] = 'lexova-secret-key-2024-secure'
app.config['JWT_SECRET_KEY'] = 'lexova-jwt-secret-key-2024'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/lexova_db'

# Initialize extensions
mongo = PyMongo(app)
jwt = JWTManager(app)
CORS(app)

# Register blueprints
app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
app.register_blueprint(users_blueprint, url_prefix='/api/users')
app.register_blueprint(lawyers_blueprint, url_prefix='/api/lawyers')
app.register_blueprint(cases_blueprint, url_prefix='/api/cases')
app.register_blueprint(admin_blueprint, url_prefix='/api/admin')
app.register_blueprint(ai_matching_blueprint, url_prefix='/api/ai')

# Register SEO blueprint
register_seo_blueprint(app)
# Make mongo available globally
app.mongo = mongo

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

