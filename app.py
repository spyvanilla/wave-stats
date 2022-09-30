from api import create_app

from flask_cors import cross_origin
from flask.helpers import send_from_directory

app = create_app()

@app.route('/')
@app.route('/profile')
@cross_origin()
def serve():
    """
    Only works if there's a build folder created in the client side,
    if a new url is added on the client, it needs to be in the app routes
    like the '/' and '/profile' routes 
    """

    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)