import json
from flask import Flask, jsonify, request
from flask_cors import CORS

from models import (
    database_connection, Asset, Vendor, Product, AssetType, ProductVersion)
from geoalchemy2 import func as gf


app = Flask(__name__)
CORS(app)


@app.route('/get-center.json')
def get_center():
    with database_connection() as db:
        centroid = gf.ST_Centroid(Asset.geometry)
        lng = db.scalar(centroid.ST_X())
        lat = db.scalar(centroid.ST_Y())
    return jsonify(json.dumps(dict(
        lat=lat,
        lng=lng)))


@app.route('/save-asset', methods=['POST'])
def save():
    data = json.loads(request.data).get('asset', None)
    with database_connection() as db:
        if data is not None:
            organization_id = 'abc'
            vendor = db.query(Vendor).filter_by(name=data['vendor'])
            product = db.query(Product).filter_by(name=data['product'])
            type_id = AssetType(int(data['type_id']))
            name = data['name']
            lng, lat = data['lng'], data['lat']
            geom = 'POINT(%s %s)' % (lng, lat)
            kws = dict(name=name, organization_id=organization_id,
                       geometry=geom, type_id=type_id, product_id=product.id,
                       vendor_id=vendor.id)
            if data['id'] < 0:
                # new asset
                asset = Asset(**kws)
                db.add(asset)
            else:
                asset = db.query(Asset).get(data['id'])
                asset.vendor_id = vendor.id
                asset.product_id = product.id
                asset.type_id = type_id
                asset.name = name
                asset.geometry = geom
                db.add(asset)
    return jsonify(
        json.dumps(dict(sucess=True)))


@app.route('/delete-asset', methods=['DELETE'])
def delete():
    asset_id = json.loads(request.data).get('id', '')
    valid = True
    with database_connection() as db:
        asset = db.query(Asset).get(asset_id)
        if asset:
            db.remove(asset)
        else:
            valid = False
    return jsonify(
        json.dumps(dict(sucess=valid)))


def serialize(asset):
    with database_connection() as db:
        product = db.query(Product).get(asset.product_id).name
        vendor = db.query(Vendor).get(asset.vendor_id).name
        version = db.query(ProductVersion).get(asset.version_id).version
        lng = db.scalar(asset.geometry.ST_X())
        lat = db.scalar(asset.geometry.ST_Y())
        d = dict(
            id=asset.id,
            lat=lat,
            lng=lng,
            name=asset.name,
            product=product,
            type_id=asset.type_id,
            vendor=vendor,
            version=version,
        )
        return d


@app.route('/search')
def search():
    with database_connection() as db:
        assets = list(map(serialize, db.query(Asset)))
        return jsonify(json.dumps(dict(
            filteredAssets=assets)))


@app.route('/get-assets.json')
def get_query():
    with database_connection() as db:
        assets = list(map(serialize, db.query(Asset)))
        return jsonify(json.dumps(dict(
            filteredAssets=assets)))


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
