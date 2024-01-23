from app import create_app
from flask_sqlalchemy import SQLAlchemy
from database import db


def init_database():
    app = create_app()
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    init_database()
