from api import create_app

from flask_cors import cross_origin
from flask.helpers import send_from_directory

app = create_app()

@app.route('/')
@app.route('/profile')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)