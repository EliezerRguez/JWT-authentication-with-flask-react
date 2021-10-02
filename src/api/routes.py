"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/sign-up', methods=['POST'])
def sign_up():
    json= request.get_json()

    if json is None:
        return

    user = User(
        email=json.get("email"),
        password=json.get("password"),
        is_active = True
    )
    
    db.session.add(user)
    db.session.commit()

    #access_token = create_access_token(user.id)
    #access_token = "asdasdasd"
    #{"access_token": access_token}
    return jsonify([]), 200

@api.route("/users", methods=["GET"])
def get_users():    
    users = User.query.all()   
    users = list(map (lambda user: user.serialize(), users))  
    
    return jsonify(users), 200