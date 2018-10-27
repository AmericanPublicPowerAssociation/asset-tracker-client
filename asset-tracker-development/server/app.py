import json
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/get-assets.json')
def get_query():
    assets = [
        {
            'id': 1,
            'vendor': "apple",
            'version': "0.3",
            'product': "quicktime",
            'lat': 40.6602037,
            'lng': -73.9689558,
        },
        {
            'id': 2,
            'vendor': "Siemens",
            'version': "4.0.3",
            'product': "relay",
            'lat': 40.5833388,
            'lng': -73.8179384,
        },
        {
            'id': 3,
            'vendor': "schneider-electric",
            'version': "4.3.2",
            'product': "circuit",
            'lat': 40.708981,
            'lng': -73.830536,
        },
        {
            'id': 4,
            'vendor': "alstom",
            'version': "3.2.0",
            'product': "fuse",
            'lat': 40.6832795,
            'lng': -73.9793,
        },
        {
            'id': 5,
            'vendor': "ge",
            'version': "3.2.0",
            'product': "transformer",
            'lat': 40.7119001,
            'lng': -73.8994671,
        },
    ]
    return jsonify(json.dumps(assets))


if __name__ == '__main__':
    app.run(debug=True)
