import json
import requests

from flask import Blueprint, session, redirect, request

auth = Blueprint('auth', __name__)

with open('credentials.json', 'r') as f:
    data = json.load(f)
    CLIENT_ID = data['CLIENT_ID']
    CLIENT_SECRET = data['CLIENT_SECRET']
    REDIRECT_URI = data['REDIRECT_URI']
    RESPONSE_TYPE = data['RESPONSE_TYPE']

@auth.route('/authorize')
def authorize():
    return redirect(f'https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type={RESPONSE_TYPE}', code=302)

@auth.route('/save-code', methods=['POST'])
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
    session['value'] = token
    return {'token': True}

@auth.route('/is-authenticated')
def is_authenticated():
    return {'authenticated': True if session.get('value') else False}