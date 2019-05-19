import json

from geoalchemy2 import func as gf
from pyramid.view import view_config, view_defaults
from sqlalchemy import and_


from ..models import (
    database_connection, Asset, AssetType, Vendor, Product, ProductVersion)
from ..utils import make_random_string, serialize


@view_defaults(renderer='json')
class API:

    @view_config(route_name='center.json')
    def get_center(self):
        with database_connection() as db:
            centroid = gf.ST_Centroid(gf.ST_Collect(Asset.geometry))
            lng = db.scalar(centroid.ST_X())
            lat = db.scalar(centroid.ST_Y())
        return dict(
            lat=lat,
            lng=lng)

    @view_config(route_name='save.json', request_method='POST')
    def save(self):
        data = json.loads(self.request.data).get('asset', None)
        with database_connection() as db:
            if data is not None:
                organization_id = 'abc'
                vendor = db.query(Vendor).filter_by(
                    name=data['vendor']).first()
                product = db.query(Product).filter_by(
                    name=data['product']).first()
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
                    return dict(asset_id=asset_id)
                else:
                    asset = db.query(Asset).get(data['id'])
                    asset.vendor_id = vendor.id
                    asset.product_id = product.id
                    asset.version_id = version.id
                    asset.type_id = type_id
                    asset.name = name
                    asset.geometry = geom
                    db.add(asset)
                    return dict(asset_id=asset.id)
            else:
                return dict(asset_id=None)

    @view_config(route_name='delete.json', request_method='DELETE')
    def delete(self):
        asset_id = json.loads(self.request.data).get('id', '')
        valid = True
        with database_connection() as db:
            asset = db.query(Asset).get(asset_id)
            if asset:
                db.remove(asset)
            else:
                valid = False
        return dict(sucess=valid)

    @view_config(route_name='search.json')
    def search(self):
        product_name = self.request.args.get('product', '')
        vendor_name = self.request.args.get('vendor', '')
        type_id = int(self.request.args.get('type_id', 0))
        with database_connection() as db:
            query = db.query(Asset).filter(
                and_(
                    Asset.product_id == Product.id,
                    Product.name.like('%{0}%'.format(product_name)),
                    Asset.vendor_id == Vendor.id,
                    Vendor.name.like('%{0}%'.format(vendor_name)),
                ))
            results = query
            if type_id > 0:
                asset_type = AssetType(type_id)
                results = query.filter_by(type_id=asset_type)
            assets = list(map(serialize, results))
            return dict(
                filteredAssets=assets)

    @view_config(route_name='assets.json')
    def get_query(self):
        with database_connection() as db:
            assets = list(map(serialize, db.query(Asset)))
            return dict(
                filteredAssets=assets)
