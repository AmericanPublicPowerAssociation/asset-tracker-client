import json
import random
import string

from models import (
        database_connection, Asset, AssetSubType,
        AssetType, Product, Vendor, ProductVersion,
        Organization)

try:
    ALPHABET = string.digits + string.letters
except AttributeError:
    ALPHABET = string.digits + string.ascii_letters
RANDOM = random.SystemRandom()


def make_random_string(length=16, alphabet=ALPHABET):
    return ''.join(RANDOM.choice(alphabet) for x in range(length))


def make_vendor(name):
    # use with statement
    return Vendor(name=name)


def make_product(vendor, name):
    assert isinstance(vendor, Vendor)
    return Product(vendor_id=vendor.id, name=name)


def make_version(product, version):
    assert isinstance(product, Product)
    return ProductVersion(
            product_id=product.id,
            version=version)


def make_asset(
        type_id,
        geometry,
        organization,
        vendor,
        product,
        version,
        name,
        **kw):
    asset_id = make_random_string()
    return Asset(
            id=asset_id,
            geometry=geometry,
            organization_id=organization.id,
            vendor_id=vendor.id,
            product_id=product.id,
            version_id=version.id,
            type_id=type_id,
            name=name,
            **kw)


with database_connection() as db:
    for asset_subtype in [
        AssetSubType(id=1, type_id=AssetType.Meter, name='Residential Meter'),
        AssetSubType(id=2, type_id=AssetType.Meter, name='Commercial Meter'),
        AssetSubType(id=3, type_id=AssetType.Meter, name='Industrial Meter'),
        AssetSubType(id=4, type_id=AssetType.Line, name='Overhead Line'),
        AssetSubType(id=5, type_id=AssetType.Line, name='Underground Line'),
        AssetSubType(id=6, type_id=AssetType.Switch, name='Circuit Breaker'),
        AssetSubType(id=7, type_id=AssetType.Switch, name='Recloser'),
        AssetSubType(id=8, type_id=AssetType.Switch, name='Relay'),
        AssetSubType(
            id=9, type_id=AssetType.Station,
            name='Photovoltaic Power Station'),
    ]:
        db.add(asset_subtype)


with open('products.json') as f:
    data = json.load(f)


products = []
with database_connection() as db:
    for v in data:
        vendor = make_vendor(v['name'])
        db.add(vendor)
        for p in v['products']:
            product = make_product(vendor, p['name'])
            db.add(product)
            for vers in p['versions']:
                version = make_version(product, vers)
                db.add(version)
                products.append((
                    vendor.name,
                    product.name,
                    version.version,
                    p['type'],
                    p['coordinates']))


with database_connection() as db:
    organization = Organization(
            id=make_random_string(),
            name='CrossCompute')
    db.add(organization)
    for i, data in enumerate(products):
        vendor_name, product_name, version, type_id, coord = data
        product = db.query(Product).filter_by(name=product_name).first()
        vendor = db.query(Vendor).filter_by(name=vendor_name).first()
        version = db.query(
            ProductVersion).filter_by(version=version).first()
        asset = make_asset(
            type_id,
            'POINT(%s %s)' % (coord['lng'], coord['lat']),
            organization,
            vendor,
            product,
            version,
            'Bus %d' % i,
            properties={
                'nominal_voltage_in_kv': 20})
        db.add(asset)
