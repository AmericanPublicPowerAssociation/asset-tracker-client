import random
import string

from .models import (
    database_connection, Vendor, Product, ProductVersion)


ALPHABET = string.digits + string.ascii_letters
RANDOM = random.SystemRandom()


def make_random_string(length=16, alphabet=ALPHABET):
    return ''.join(RANDOM.choice(alphabet) for x in range(length))


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
