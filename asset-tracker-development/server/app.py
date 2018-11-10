import json
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/get-assets.json')
def get_query():
    connections = [(0, 2), (1, 3), (2, 4)]
    assets = [
        {
            'id': 0,
            'vendor': "apple",
            'version': "0.3",
            'product': "quicktime",
            'lat': 40.6602037,
            'lng': -73.9689558,
        },
        {
            'id': 1,
            'vendor': "Siemens",
            'version': "4.0.3",
            'product': "relay",
            'lat': 40.5833388,
            'lng': -73.8179384,
        },
        {
            'id': 2,
            'vendor': "schneider-electric",
            'version': "4.3.2",
            'product': "circuit",
            'lat': 40.708981,
            'lng': -73.830536,
        },
        {
            'id': 3,
            'vendor': "alstom",
            'version': "3.2.0",
            'product': "fuse",
            'lat': 40.6832795,
            'lng': -73.9793,
        },
        {
            'id': 4,
            'vendor': "ge",
            'version': "3.2.0",
            'product': "transformer",
            'lat': 40.7119001,
            'lng': -73.8994671,
        },
    ]
    return jsonify(json.dumps(dict(
        all_assets=assets,
        connections=connections)))


if __name__ == '__main__':
    app.run(debug=True)
