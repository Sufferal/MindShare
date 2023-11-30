from flask import Flask
from database import db


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mindShareDatabase.db'
    db.init_app(app)
    return app
