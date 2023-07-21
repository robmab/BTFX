"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# import json
# from api.utils import generate_sitemap, APIException

from flask_mail import Message
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User, Category, Team, Competition, Championship, Competition_Data, Inscriptions
from flask import request, jsonify, Blueprint, current_app, render_template
import datetime
import os
api = Blueprint('api', __name__)

# PROFILE


@api.route("/recoverPassword", methods=["POST"])
def recoverPassword():
    try:

        email = request.get_json(force=True)
        url = os.getenv('FRONTEND_URL') + 'reset-password/'

        # Check if email already exist
        user = User.query.filter_by(email=email).first()
        if user == None:
            return jsonify({"msg": "Email doesn't exist"}), 401

        # Create a token with a expire time of 1 day,
        # and change for valid URL with replace
        expires = datetime.timedelta(hours=24)
        reset_token = create_access_token(str(user.id), expires_delta=expires)
        reset_token = reset_token.replace(".", "&")

        # Send email with the URL + Token
        msg = Message(subject='BTXF - Recuperar contraseña',
                      sender='rob_mb@outlook.es', recipients=[email])
        msg.body = 'Pulsa en el link a continuación para crear una nueva contraseña: ' + \
            url + reset_token

        context = {"url": url,
                   "reset_token": reset_token}
        msg.html = render_template(
            template_name_or_list="recover-password.html", **context)

        current_app.mail.send(msg)

        return jsonify({"msg": "Ok. Email sended"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/resetPassword", methods=["PUT"])
@jwt_required()
def resetPassword():
    try:
        # Encrypt
        password = request.get_json(force=True)
        pw_hash = current_app.bcrypt.generate_password_hash(
            password).decode("utf-8")

        # Get User with token
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        # Edit password
        user.password = pw_hash
        db.session.commit()

        return jsonify({"msg": "Ok. Password reseted"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Empiezo los ENDPOINT de USUARIO


@api.route('/signup', methods=['POST'])
def signup():
    try:
        dni = request.json.get("dni", None)
        name = request.json.get("name", None)
        subname = request.json.get("subName", None)
        phone = request.json.get("mobile", None)
        user_name = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        # Encrypt password
        pw_hash = current_app.bcrypt.generate_password_hash(
            password).decode("utf-8")

        # Add user
        user = User(
            email=email, password=pw_hash, name=name,
            subname=subname, phone=None if phone == "" else phone, user_name=user_name, dni=dni
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({'msg': "Ok. User created)"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/login", methods=["POST"])
def login():

    try:
        first_field = request.json.get("firstField", None)
        password = request.json.get("password", None)
        remember = request.json.get("remember", None)

        # Check if user exist
        user = User.query.filter((User.email == first_field) | (
            User.dni == first_field) | (User.user_name == first_field)).first()
        if user is None:
            return jsonify({"msg": "El usuario no fue encontrado."}), 401

        # Check password
        check_password = current_app.bcrypt.check_password_hash(
            user.password, password)
        if not check_password:
            return jsonify({"msg": "Incorrect password"}), 401

        # Create token that expires in 1 day or never depend of remember
        access_token = create_access_token(
            identity=user.id, expires_delta=False if remember else datetime.timedelta(days=1))

        return jsonify({"msg": "Ok",
                        "token": access_token,
                        "user": user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/profile/edit", methods=["PUT"])
@jwt_required()
def edit_profile():

    try:
        dni = request.json.get("dni", None)
        name = request.json.get("name", None)
        subname = request.json.get("subname", None)
        phone = request.json.get("phone", None)
        user_name = request.json.get("username", None)
        email = request.json.get("email", None)

        # Get current user
        current_user = get_jwt_identity()
        user = User.query.get(current_user)

        # Check User exist
        if user == None:
            return jsonify({"msg": "User not found"}), 404

        # Edit User
        user.dni = dni
        user.name = name
        user.subname = subname
        user.phone = phone
        user.user_name = user_name
        user.email = email

        db.session.commit()

        return jsonify({'msg': "Ok. User edited",
                        "user": user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/trials", methods=["GET"])
def trials():
    try:
        #Get trials
        trials = list(
            map(lambda item: item.serialize(), Competition.query.all()))

        return jsonify({"msg": "Ok",
                        "response": trials if trials else []}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/inscription-user", methods=["PUT", "POST"])
@jwt_required()
def inscription_user():

    try:
        current_user = get_jwt_identity()

        event = request.json.get("event", None)
        uci_id = request.json.get("uciId", None)
        license = request.json.get("license", None)
        date = request.json.get("date", None)
        federated = request.json.get("federated", None)
        gender = request.json.get("gender", None)

        user = User.query.get(current_user)
        event = Competition.query.filter_by(title=event).first().id
        inscription = Inscriptions.query.filter_by(
            user_id=current_user, competition_id=event).first()

        if inscription is not None:
            return jsonify({"msg": "This inscription already exist"}), 403

        user.uci_id = int(uci_id)
        user.license = license
        user.date = date
        user.federated = federated
        user.gender = gender

        data = Inscriptions(
            user_id=int(current_user), competition_id=int(event)
        )

        db.session.add(data)
        db.session.commit()

        return jsonify({"msg": "Ok",
                        "response": user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/tournaments", methods=["GET"])
def tournaments():
    try:
        tournaments = list(
            map(lambda item: item.serialize()["title"], Championship.query.all()))

        return jsonify({"msg": "Ok",
                        "response": tournaments
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/inscriptions", methods=["GET"])
def inscriptions():
    try:
        ins = list(
            map(lambda item: item.serialize(), Inscriptions.query.all()))

        return jsonify({"msg": "Ok",
                        "response": ins
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/categories", methods=["GET"])
def categories():
    try:
        categories = list(
            map(lambda item: item.serialize(), Category.query.all()))

        return jsonify({"msg": "Ok",
                        "response": categories
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/teams", methods=["GET"])
def teams():
    try:
        teams = list(
            map(lambda item: item.serialize(), Team.query.all()))

        return jsonify({"msg": "Ok",
                        "response": teams
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/event-results", methods=["GET"])
def event_results():
    try:
        event_results = list(
            map(lambda item: item.serialize() if item != None else item, Competition_Data.query.all()))

        return jsonify({"msg": "Ok",
                        "response": event_results
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/user-validation", methods=["POST", "PUT"])
def user_validation():
    try:
        user = request.json.get("user", None)
        competition = request.json.get("competition", None)
        dorsal = request.json.get("dorsal", None)
        category = request.json.get("category", None)
        team = request.json.get("team", None)

        competition_data = Competition_Data(
            user_id=user,
            competition_id=competition,
            dorsal=dorsal
        )
        print("1")
        db.session.add(competition_data)

        user_data = User.query.get(user)

        if category == "":
            category = None
        if team == "":
            team = None

        print("2")
        if category != None and team != None:
            category_id = Category.query.filter_by(name=category).first().id
            team_id = Team.query.filter_by(name=team).first().id

            user_data.category_id = category_id
            user_data.team_id = team_id

        print("")
        db.session.commit()

        return jsonify({"msg": "Ok", }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/inscriptions-delete/<int:id_user>/<int:id_competition>", methods=["DELETE"])
def inscriptions_delete(id_user, id_competition):

    try:

        inscription = Inscriptions.query.filter_by(
            user_id=id_user, competition_id=id_competition).first()

        db.session.delete(inscription)
        db.session.commit()

        return jsonify({"msg": "Ok, Deleted"
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/register-event", methods=["PUT"])
def register_event():
    try:
        id_event = request.json.get("idEvent", None)
        time = request.json.get("time", None)
        points = request.json.get("points", None)

        competition_data = Competition_Data.query.get(id_event)

        competition_data.time = time
        competition_data.points = points

        db.session.commit()

        return jsonify({"msg": "Ok, probando"}
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
