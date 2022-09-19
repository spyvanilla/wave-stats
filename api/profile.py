import requests

from flask import Blueprint

from api.auth import get_token

profile = Blueprint('profile', __name__)

API_URL = 'https://api.spotify.com/v1'

KEY_GENRE_WORDS = ['rock','pop','blues','bossanova','emo','jazz','alternative','country','classical']

@profile.route('/get-main-info')
def get_main_info():
    token = get_token()

    if token is None:
        return {'profile': None}

    user_profile = requests.get(f'{API_URL}/me', headers={'Authorization': f'Bearer {token}'}).json()
    return {'profile': user_profile}

@profile.route('/get-current-track')
def get_current_track():
    token = get_token()

    if token is None:
        return {'current_track': None}

    try:
        current_track = requests.get(f'{API_URL}/me/player/currently-playing', headers={'Authorization': f'Bearer {token}'}).json()
    except Exception:
        return {'current_track': None}

    return {'current_track': current_track}

@profile.route('/get-genres')
def get_top_artists():
    token = get_token()

    if token is None:
        return {'genres': None}

    artists = requests.get(f'{API_URL}/me/top/artists?time_range=short_term', headers={'Authorization': f'Bearer {token}'}).json()['items']
    return {'data': artists}