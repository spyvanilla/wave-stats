import requests

from flask import Blueprint

from api.auth import get_token

profile = Blueprint('profile', __name__)

API_URL = 'https://api.spotify.com/v1'

KEY_GENRE_WORDS = {
    'rock': ['#891a12','#891a12','#aa2419','#e71616'],
    'pop': ['#c224cc','#7f1989'],
    'blues': ['#262bc5','#14195e'],
    'bossanova': ['#26c534','#0b3910'],
    'emo': ['#0b0c0c','#2a2f2a'],
    'jazz': ['#894f19','#281a0a'],
    'alternative': ['#2642c4','#12186f'],
    'country': ['#cccca5','#57582f'],
    'classical': ['#b47c99','#2a1a2c']
}

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

@profile.route('/get-top-genre')
def get_top_artists():
    token = get_token()

    if token is None:
        return {'genres': None}

    artists = requests.get(f'{API_URL}/me/top/artists?time_range=short_term', headers={'Authorization': f'Bearer {token}'}).json()['items']
    genres = {}

    for artist in artists:
        artist_genres = artist['genres']

        for genre in artist_genres:
            if genre in genres.keys():
                genres[genre] = genres[genre]+1
            else:
                genres[genre] = 1

    genres = dict(sorted(genres.items(), key=lambda item: item[1], reverse=True))
    top_genre = None

    for genre in genres.keys():
        if top_genre is not None:
            break

        for key_genre in KEY_GENRE_WORDS.keys():
            if genre in key_genre:
                top_genre = {genre: KEY_GENRE_WORDS[key_genre]}
                break

    print(top_genre)

    return {'genre': 'a'}