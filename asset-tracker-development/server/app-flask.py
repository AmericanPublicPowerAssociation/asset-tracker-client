from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random
import string
from sqlalchemy import and_

from models import (
    database_connection, Asset, Vendor, Product, AssetType, ProductVersion)
from geoalchemy2 import func as gf


app = Flask(__name__)
CORS(app)


try:
    ALPHABET = string.digits + string.letters
except AttributeError:
    ALPHABET = string.digits + string.ascii_letters
RANDOM = random.SystemRandom()


def make_random_string(length=16, alphabet=ALPHABET):
    return ''.join(RANDOM.choice(alphabet) for x in range(length))


@app.route('/get-center.json')
def get_center():
    with database_connection() as db:
        centroid = gf.ST_Centroid(gf.ST_Collect(Asset.geometry))
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
            vendor = db.query(Vendor).filter_by(name=data['vendor']).first()
            product = db.query(Product).filter_by(name=data['product']).first()
            version = db.query(ProductVersion).filter_by(
                    version=data['version']).first()
            type_id = AssetType(int(data['type_id']))
            name = data['name']
            lng, lat = data['lng'], data['lat']
            geom = 'POINT(%s %s)' % (lng, lat)
            if data['id'] == '':
                asset_id = make_random_string()
                kws = dict(
                        id=asset_id, name=name,
                        organization_id=organization_id,
                        geometry=geom, version_id=version.id,
                        type_id=type_id, product_id=product.id,
                        vendor_id=vendor.id)
                # new asset
                asset = Asset(**kws)
                db.add(asset)
                return jsonify(
                    json.dumps(dict(asset_id=asset_id)))
            else:
                asset = db.query(Asset).get(data['id'])
                asset.vendor_id = vendor.id
                asset.product_id = product.id
                asset.version_id = version.id
                asset.type_id = type_id
                asset.name = name
                asset.geometry = geom
                db.add(asset)
                return jsonify(
                    json.dumps(dict(asset_id=asset.id)))
        else:
            return jsonify(
                json.dumps(dict(asset_id=None)))


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
    product_name = request.args.get('product', '')
    vendor_name = request.args.get('vendor', '')
    type_id = int(request.args.get('type_id', -1))
    with database_connection() as db:
        query = db.query(Asset).filter(
            and_(
                Asset.product_id == Product.id,
                Product.name.like('%{0}%'.format(product_name)),
                Asset.vendor_id == Vendor.id,
                Vendor.name.like('%{0}%'.format(vendor_name)),
            ))
        results = query
        if type_id >= 0:
            asset_type = AssetType(type_id)
            results = query.filter_by(type_id=asset_type)
        assets = list(map(serialize, results))
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
