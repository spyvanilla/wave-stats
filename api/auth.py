import json
import requests

from flask import Blueprint, session, redirect, request
from flask_cors import cross_origin

auth = Blueprint('auth', __name__)

with open('credentials.json', 'r') as f:
    data = json.load(f)
    CLIENT_ID = data['CLIENT_ID']
    CLIENT_SECRET = data['CLIENT_SECRET']
    REDIRECT_URI = data['REDIRECT_URI']
    SCOPES = data['SCOPES']

def get_token():
    token = session.get('token')
    refresh_token = session.get('refresh_token')

    if token is None:
        return None

    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }

    new_token = requests.post(f'https://accounts.spotify.com/api/token', data=data).json()['access_token']
    session['token'] = new_token
    return new_token

@auth.route('/authorize')
@cross_origin()
def authorize():
    return redirect(f'https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope={SCOPES}&response_type=code', code=302)

@auth.route('/save-code', methods=['POST'])
@cross_origin()
def save_code():
    code = json.loads(request.data)['code']

    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }

    token = requests.post('https://accounts.spotify.com/api/token', data=data).json()
    session['token'] = token['access_token']
    session['refresh_token'] = token['refresh_token']
    return {'token': True}

@auth.route('/is-authenticated')
@cross_origin()
def is_authenticated():
    return {'authenticated': True if session.get('token') else False}

@auth.route('/erase-profile')
@cross_origin()
def erase_profile():
    session.pop('token', None)
    session.pop('refresh_token', None)
    return {'erased': True}