"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint, current_app, render_template
from api.models import db, User, Category, Club, Team, Competition, Championship, Competition_Data, Category_Competition, Inscriptions
from api.utils import generate_sitemap, APIException
from sqlalchemy import or_

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from flask_mail import Message, Mail
from threading import Thread

# import timedelta

api = Blueprint('api', __name__)


@api.route("/recoverPassword", methods=["POST"])
def recoverPassword():

    try:

        email = request.get_json(force=True)
        url = os.getenv('FRONTEND_URL') + 'reset-password/'

        user = User.query.filter_by(email=email).first()

        if user == None:
            return jsonify({"msg": "Email no existe"}), 401

        expires = datetime.timedelta(hours=24)
        reset_token = create_access_token(str(user.id), expires_delta=expires)

        reset_token = reset_token.replace(".", "&")

        msg = Message(subject='BTFX - Recuperar contraseña',
                      sender='rob_mb@outlook.es', recipients=[email])

        msg.body = 'Pulsa en el link a continuación para crear una nueva contraseña: ' + \
            url + reset_token

        current_app.mail.send(msg)

        return jsonify({"msg": "Ok",
                        "response": "ok"
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/resetPassword", methods=["PUT"])
@jwt_required()
def resetPassword():
    try:
        password = request.get_json(force=True)
        pw_hash = current_app.bcrypt.generate_password_hash(
            password).decode("utf-8")

        current_user = get_jwt_identity()

        user = User.query.get(current_user)

        user.password = pw_hash
        db.session.commit()

        return jsonify({"msg": "ok"}), 200

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

    # #Encrypt password

        pw_hash = current_app.bcrypt.generate_password_hash(
            password).decode("utf-8")

        user = User(
            email=email, password=pw_hash, name=name,
            subname=subname, phone=phone, user_name=user_name,
            dni=dni, uci_id=None, licencia=None,
            federado=None, sexo=None, fecha_nacimiento=None
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({'msg': "Ok. User created :)"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/login", methods=["POST"])
def login():

    try:
        first_field = request.json.get("firstField", None)
        password = request.json.get("password", None)
        remember = request.json.get("remember", None)

        user = User.query.filter((User.email == first_field) | (
            User.dni == first_field) | (User.user_name == first_field)).first()

        if user is None:
            return jsonify({"msg": "El usuario no fue encontrado."}), 401

        # Check password
        check_password = current_app.bcrypt.check_password_hash(
            user.password, password)
        if not check_password:
            return jsonify({"msg": "Incorrect password"}), 401

        if remember:
            access_token = create_access_token(
                identity=user.id, expires_delta=False)
        else:
            access_token = create_access_token(
                identity=user.id, expires_delta=datetime.timedelta(days=1))

        return jsonify({"msg": "Ok",
                        "token": access_token,
                        "user": user.serialize()
                        }
                       ), 200

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

        current_user = get_jwt_identity()
        user = User.query.get(current_user)

        if user == None:
            return jsonify({"msg": "User not found"}), 404

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

        def query_trials(item):
            obj = item.serialize()
            # CONVERT TIME AND DATE TO STRING FOR JSONIFY
            for key in obj:
                if isinstance(obj[key], datetime.date) or isinstance(obj[key], datetime.time):
                    obj[key] = str(obj[key])

            # ADD RUNNERS TO RESPONSE
            runners = list(map(lambda item: item.serialize(), Competition_Data.query.filter_by(
                competition_id=obj["id"]).all()))

            run = []
            for x in runners:
                aux = {}
                aux["name"] = x["user"]["name"]
                aux["team"] = x["user"]["team"]["name"] if x["user"]["team"] != None else x["user"]["team"]

                aux["points"] = x["points"]
                aux["categorie"] = x["user"]["category"]["name"] if x["user"]["category"] != None else x["user"]["category"]
                run.append(aux)

            obj["runners"] = run

            return obj

        trials = list(
            map(query_trials, Competition.query.all()))

        if not trials:
            # No content
            return jsonify({"msg": "No existen torneos",
                            "response": []}), 204

        return jsonify({"msg": "Ok",
                        "response": trials
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/inscription-user", methods=["PUT", "POST"])
@jwt_required()
def inscription_user():

    try:
        current_user = get_jwt_identity()

        uci_id = request.json.get("uciId", None)
        fecha_nacimiento = request.json.get("fechaN", None)
        licencia = request.json.get("licencia", None)
        federado = request.json.get("federado", None)
        sexo = request.json.get("sexoUser", None)
        event = request.json.get("event", None)

        user = User.query.get(current_user)

        event = Competition.query.filter_by(title=event).first().id

        inscription = Inscriptions.query.filter_by(
            user_id=current_user, competition_id=event).first()

        if inscription is not None:
            return jsonify({"msg": "This inscription already exist"}), 403
        print(licencia)
        user.uci_id = int(uci_id)
        user.licencia = licencia
        user.fecha_nacimiento = fecha_nacimiento
        user.federado = federado
        user.sexo = sexo

        data = Inscriptions(
            user_id=int(current_user), competition_id=int(event)
        )

        db.session.add(data)

        db.session.commit()
        print(data)

        return jsonify({"msg": "Ok",
                        "response": user.serialize()
                        }
                       ), 200

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
