from pyramid.view import view_config
# from pyramid.response import Response
# from sqlalchemy.exc import DBAPIError
# from sqlalchemy.orm import sessionmaker
# from asset_tracker.models.asset import (engine, Asset, Base, VulnerableAsset)

# Base.metadata.bind = engine
# DatabaseSession = sessionmaker(bind=engine)


@view_config(route_name='index', renderer='../templates/dashboard.jinja2')
def index(request):
    return {}


"""
@view_config(route_name='vulnerable_assets', renderer='json')
def vulnerable_assets(request):
    db = request.dbsession
    # hardcoded for now
    user_id = 'alex_appa'
    assets = db.query(Asset).innerjoin(
        VulnerableAsset,
        Asset.id == Vulnerable.asset_id).find(user_id=user_id)
    return assets
"""

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


db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for descriptions and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""
