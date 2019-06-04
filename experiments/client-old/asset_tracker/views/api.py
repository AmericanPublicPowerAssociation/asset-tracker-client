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
