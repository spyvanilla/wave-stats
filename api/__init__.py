import json

import redis
from flask import Flask
from flask_session import Session
from flask_cors import CORS

sess = Session()

def create_app():
    """
    This function is responsible for creating every config the api
    needs before it runs
    """

    with open("credentials.json","r") as f:
        data = json.load(f)
        SECRET_KEY = data['SECRET_KEY']
        REDIS_HOST = data['REDIS_HOST']
        REDIS_PORT = data['REDIS_PORT']
        REDIS_PASSWORD = data['REDIS_PASSWORD']

    app = Flask(__name__, static_folder='../client/build', static_url_path='')
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASSWORD)

    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SESSION_TYPE'] = 'redis'
    app.config['SESSION_REDIS'] = r

    sess.init_app(app) # It's responsible for making requests to a redis instance using default session function in flask
    CORS(app)

    # The blueprints can only be imported here, else it will throw an circular import error
    from .auth import auth
    from .profile import profile

    app.register_blueprint(auth,url_prefix='/api')
    app.register_blueprint(profile,url_prefix='/api')

    return app