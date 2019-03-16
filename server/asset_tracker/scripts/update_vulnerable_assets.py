import argparse
import sys

from pymongo import MongoClient
from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from asset_tracker.models import Asset, VulnerableAsset


def get_vulnerabilities(asset, mongo_cursor):
    vulnerabilities = query_nvd(mongo_cursor, asset.name)
    return [{
            'asset_id': asset.id,
            'id': v['id'],
            'description': v['description'],
            'date_published': v['date_published'],
            'score': v['score']} for v in vulnerabilities]


def query_nvd(cursor, product_name=None, vendor_name=None, version_value=None):
    product_query, vendor_query, version_query = {}, {}, {}
    if not (product_name or vendor_name or version_value):
        return None
    if product_name:
        product_query_string = \
            'cve.affects.vendor.vendor_data.product.product_data.product_name'
        product_query = {
            product_query_string: product_name}
    if vendor_name:
        vendor_query_string = \
            'cve.affects.vendor.vendor_data.vendor_name'
        vendor_query = {
            vendor_query_string: vendor_name}
    if version_value:
        version_query_string = \
            'cve.affects.vendor.vendor_data.product.product_data.version.' + \
            'version_data.version_value'
        version_query = {
            version_query_string: version_value}
    results = []
    for x in cursor.find(
            {'$and': [product_query, vendor_query, version_query]}):
        r = {
            'description':
                x['cve']['description']['description_data'][0]['value'],
            'id': x['cve']['CVE_data_meta']['ID'],
            'date_published': x['publishedDate'],
            'score': x[
                'impact'].get('baseMetricV2', {}).get(
                    'cvssV2', {}).get('baseScore', None)
        }
        results.append(r)
    return results


def get_assets(dbsession):
    for a in dbsession.query(Asset).outerjoin(VulnerableAsset).filter(
            VulnerableAsset.asset_id is None):
        yield a


def search_vulnerabilities(dbsession, mongo_cursor):
    assets = get_assets(dbsession)
    vulnerable_assets = filter(
        lambda a: a is not None, (
         get_vulnerabilities(a, mongo_cursor)
         for a in assets))
    for vulnerabilities in vulnerable_assets:
        for vulnerability in vulnerabilities:
            va = VulnerableAsset(
                id=vulnerability['id'],
                asset_id=vulnerability['asset_id'],
                description=vulnerability['description'],
                date_published=vulnerability['date_published'],
                score=vulnerability['score'])
            dbsession.add(va)
            dbsession.commit()


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def get_mongo_connection():
    URL = 'mongodb://localhost:27017/Vulnerabilities'
    MONGO_DICT = dict(
        database='Vulnerabilities',
        collection='NVD',
        document='CVE_Items')
    client = MongoClient(URL)
    database = client[MONGO_DICT['database']]
    collection = database[MONGO_DICT['collection']]
    return collection[MONGO_DICT['document']]


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)
    mongo_cursor = get_mongo_connection()

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            search_vulnerabilities(dbsession, mongo_cursor)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')


if __name__ == '__main__':
    cursor = get_mongo_connection()
    vulnerabilities = query_nvd(cursor, 'mds_pulsenet')
    # import pprint; print = pprint.PrettyPrinter(indent=4).pprint
    print(vulnerabilities)
