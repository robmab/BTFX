from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    user_name = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=False)
    subname = db.Column(db.String(80), unique=False, nullable=False)
    dni = db.Column(db.String(9), unique=True, nullable=False)

    phone = db.Column(db.Integer, unique=False, nullable=True)
    gender = db.Column(db.Enum('Hombre', 'Mujer', name="sexo"), nullable=True)
    date = db.Column(db.Date, nullable=True)
    uci_id = db.Column(db.BigInteger, unique=True, nullable=True)
    license = db.Column(db.String(20), unique=True, nullable=True)
    federated = db.Column(db.Enum('Sí', 'No', name="federado"), nullable=True)
    role = db.Column(db.Enum('User', 'Manager', 'Admin',
                     name="role"), nullable=False, server_default="User")
    rider = db.Column(db.Enum('Yes', 'No',
                              name="rider"), nullable=True, server_default="No")

    # ForeignKeys
    category_id = db.Column(db.Integer, db.ForeignKey(
        "category.id"), nullable=True)
    team_id = db.Column(db.Integer, db.ForeignKey(
        "team.id"), nullable=True)

    # Relationships
    competition_data = db.relationship(
        "Competition_Data", backref="user", lazy=True)
    inscriptions = db.relationship(
        "Inscriptions", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.name}, {self.id}>'

    def serialize(self):
        category = Category.query.get(self.category_id)
        team = Team.query.get(self.team_id)

        return {
            "id": self.id,
            "role": self.role,
            "email": self.email,
            "name": self.name,
            "subname": self.subname,
            "phone": self.phone,
            "user_name": self.user_name,
            "dni": self.dni,
            "uci_id": self.uci_id,
            "license": self.license,
            "federated": self.federated,
            "gender": self.gender,
            "date": str(self.date),
            "role": self.role,
            "rider": self.rider,

            "category": None if category is None else category.name,
            "team": None if team is None else team.name

        }


class Team(db.Model):
    __tablename__ = "team"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

    # ForeignKeys
    club_id = db.Column(db.Integer, db.ForeignKey(
        "club.id"), nullable=False)

    # Relationships
    user = db.relationship("User", backref="team", lazy=True)

    def __repr__(self):
        return f'<Team {self.name}, {self.id}>'

    def serialize(self):
        club = Club.query.get(self.club_id)

        return {
            "id": self.id,
            "name": self.name,

            "club": club.serialize() if club != None else club
        }


class Club(db.Model):
    __tablename__ = "club"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

    # Relationships
    team = db.relationship("Team", backref="club", lazy=True)

    def __repr__(self):
        return f'<Club {self.name}, {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

    # Relationships
    user = db.relationship("User", backref="category", lazy=True)
    category_competition = db.relationship(
        "Category_Competition", backref="category", lazy=True)

    def __repr__(self):
        return f'<Category {self.name}, {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Category_Competition(db.Model):
    __tablename__ = "category_competition"
    id = db.Column(db.Integer, primary_key=True)

    # ForeignKeys
    category_id = db.Column(db.Integer, db.ForeignKey(
        "category.id"), nullable=False)
    competition_id = db.Column(db.Integer, db.ForeignKey(
        "competition.id"), nullable=False)

    def __repr__(self):
        return f'<Category {self.id}, {self.id}>'

    def serialize(self):
        category = Category.query.get(self.category_id)
        competition = Competition.query.get(self.competition_id)

        return {
            "id": self.id,
            "category": category.name,
            "competition": competition.title

        }


class Competition(db.Model):
    __tablename__ = "competition"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), unique=False, nullable=False)
    date_celebration = db.Column(db.Date, nullable=True)
    time_celebration = db.Column(db.Time, nullable=True)
    location = db.Column(db.String(30), unique=False, nullable=True)
    date_license = db.Column(db.Date, nullable=True)
    organizer = db.Column(db.String(30), unique=False, nullable=True)
    participation_limit = db.Column(db.Integer, unique=False, nullable=True)
    email_incidents = db.Column(db.String(30), unique=False, nullable=True)

    # ForeignKeys
    championship_id = db.Column(db.Integer, db.ForeignKey(
        "championship.id"), nullable=False)

    # Relationships
    competition_data = db.relationship(
        "Competition_Data", backref="competition", lazy=True)
    category_competition = db.relationship(
        "Category_Competition", backref="competition", lazy=True)
    inscriptions = db.relationship(
        "Inscriptions", backref="competition", lazy=True)

    def __repr__(self):
        return f'<Competition {self.title}, {self.id}>'

    def serialize(self):
        # Championship
        championship = Championship.query.get(self.championship_id)

        # Categories
        aux = Category_Competition.query.filter_by(
            competition_id=self.id).all()
        categories = list(map(lambda item: item.serialize()["category"], aux))

        # Runners | We seralize all less competition for evade infinite loop.
        def handleRunners(item):
            aux = {"id": item.id,
                   "dorsal": item.dorsal,
                   "time": str(item.time),
                   "points": item.points,
                   "user": item.user.serialize()}
            return aux

        runners = list(map(handleRunners, Competition_Data.query.filter_by(
            competition_id=self.id).all()))

        return {
            "id": self.id,
            "name": self.title,
            "date_celebration": str(self.date_celebration),
            "time_celebration": str(self.time_celebration),
            "date_license": str(self.date_license),
            "location": self.location,

            "organizer": self.organizer,
            "participation_limit": self.participation_limit,
            "email_incidents": self.email_incidents,

            "categories": categories,
            "tournament": championship.title if championship != None else championship,
            "runners": runners
        }


class Championship (db.Model):
    __tablename__ = "championship"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), unique=True, nullable=False)

    # Relationships
    competition = db.relationship(
        "Competition", backref="championship", lazy=True)

    def __repr__(self):
        return f'<Championship {self.title}, {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }


class Competition_Data (db.Model):
    __tablename__ = "competition_data"
    id = db.Column(db.Integer, primary_key=True)
    dorsal = db.Column(db.Integer, unique=False)
    time = db.Column(db.Time, unique=False, nullable=True)
    points = db.Column(db.Integer, unique=False, nullable=True)

    # ForeignKeys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competition.id'))

    def __repr__(self):
        return f'<Competition_Data {self.id}>'

    def serialize(self):
        user = User.query.get(self.user_id)
        competition = Competition.query.get(self.competition_id)

        return {
            "id": self.id,
            "dorsal": self.dorsal,
            "time": str(self.time),
            "points": self.points,

            "user": user.serialize(),
            "competition": competition.serialize()
        }


class Inscriptions (db.Model):
    __tablename__ = "inscriptions"
    id = db.Column(db.Integer, primary_key=True)

    # ForeignKeys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competition.id'))

    def __repr__(self):
        return f'<Competition_Data {self.id}>'

    def serialize(self):
        user = User.query.get(self.user_id)
        competition = Competition.query.get(self.competition_id)

        return {
            "id": self.id,

            "user": user.serialize() if user != None else user,
            "competition": competition.serialize() if competition != None else competition,
        }
