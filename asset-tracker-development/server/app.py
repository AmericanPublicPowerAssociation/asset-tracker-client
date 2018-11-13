import json
import re
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
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
with open('data.json') as f:
    assets = json.load(f)


@app.route('/get-center.json')
def get_center():
    lat = []
    lng = []
    for a in assets:
          lat.append(a['lat'])
          lng.append(a['lng'])
    return jsonify(json.dumps(dict(
        lat=sum(lat)/len(lat),
        lng=sum(lng)/len(lng))))


@app.route('/get-connections.json')
def get_connections():
    connections = [(0, 2), (1, 3), (2, 4)]
    return jsonify(json.dumps(
        dict(connections=connections)))


@app.route('/search')
def search():
    query = request.args.get('query', None)
    print(query)
    l = []
    if query is not None:
        for a in assets:
            template = r'.*%s.*' % query
            vendor_match = re.search(
                    template, a['vendor'], re.IGNORECASE)
            product_match = re.search(
                    template, a['product'], re.IGNORECASE)
            if vendor_match or product_match:
                l.append(a)
    return jsonify(json.dumps(dict(filteredAssets=l)))


@app.route('/get-assets.json')
def get_query():
    return jsonify(json.dumps(dict(
        assets=assets)))


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
