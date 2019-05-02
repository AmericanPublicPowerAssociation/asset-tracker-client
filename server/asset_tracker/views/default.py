@view_config(
    request_method='GET',
    route_name='vulnerable_assets',
    renderer='json')
def vulnerable_assets(request):
    product_name = request.GET.get('product') or None
    vendor_name = request.GET.get('vendor') or None
    version = request.GET.get('version') or None
    cursor = get_mongo_connection()
    vulnerabilities = query_nvd(cursor, product_name, vendor_name, version)
    '''
    db = request.dbsession
    assets = db.query(Asset) \
        .join(VulnerableAsset, Asset.id == VulnerableAsset.asset_id).all()
    '''
    return vulnerabilities


"""
@view_config(route_name='home', renderer='../templates/mytemplate.jinja2')
def my_view(request):
    try:
        query = request.dbsession.query(models.MyModel)
        one = query.filter(models.MyModel.name == 'one').first()
    except DBAPIError:
        return Response(db_err_msg, content_type='text/plain', status=500)
    return {'one': one, 'project': 'asset_tracker'}
"""
