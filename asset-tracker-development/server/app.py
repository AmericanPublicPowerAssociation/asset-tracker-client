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
        'circuit': 'Ann'
    },
    {
        'id': 1,
        'vendor': "Siemens",
        'version': "4.0.3",
        'product': "relay",
        'lat': 40.5833388,
        'lng': -73.8179384,
        'circuit': 'Bob'
    },
    {
        'id': 2,
        'vendor': "schneider-electric",
        'version': "4.3.2",
        'product': "circuit",
        'lat': 40.708981,
        'lng': -73.830536,
        'circuit': 'Ann'
    },
    {
        'id': 3,
        'vendor': "alstom",
        'version': "3.2.0",
        'product': "fuse",
        'lat': 40.6832795,
        'lng': -73.9793,
        'circuit': 'Bob'
    },
    {
        'id': 4,
        'vendor': "ge",
        'version': "3.2.0",
        'product': "transformer",
        'lat': 40.7119001,
        'lng': -73.8994671,
        'circuit': 'Ann'
    },
]
with open('data.json') as f:
    assets = json.load(f)
connections = [(0, 2), (1, 3), (2, 4)]
with open('connections.json') as f:
    connections = json.load(f)


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
    node = int(request.args.get('node', None))
    curr_assets, conn = [], []
    if node is not None:
        curr_assets = [assets[node]]
        for f, t in connections:
            if node in [f, t]:
                other = f if node != f else t
                curr_assets.append(assets[other])
                conn.append((f, t))
    return jsonify(json.dumps(
        dict(assets=curr_assets, connections=conn)))


@app.route('/search')
def search():
    product = request.args.get('product', '')
    vendor = request.args.get('vendor', '')
    results = []
    for a in assets:
        template = r'.*%s.*'
        vendor_match = re.search(
                template % vendor, a['vendor'], re.IGNORECASE)
        product_match = re.search(
                template % product, a['product'], re.IGNORECASE)
        if vendor_match and product_match:
            results.append(a)
    return jsonify(json.dumps(dict(filteredAssets=results)))


@app.route('/get-assets.json')
def get_query():
    return jsonify(json.dumps(dict(
        assets=assets)))


@app.route('/get-circuit.json')
def get_circuit():
    circuit_id = request.args.get('circuit_id', None)
    group = {a['id']: a for a in assets if a['circuit'] == circuit_id}
    edges = [(a, b) for a, b in connections if a in group and b in group]
    return jsonify(
        json.dumps(dict(assets=list(group.values()), connections=edges)))


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
