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
