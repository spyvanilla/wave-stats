import json

from flask import Flask
from flask_redis import FlaskRedis

redis_client = FlaskRedis()

def create_app():
    with open("credentials.json","r") as f:
        data = json.load(f)
        REDIS_URL = data['REDIS_URL']

    app = Flask(__name__)

    app.config['REDIS_URL'] = REDIS_URL

    redis_client.init_app(app)

    return app