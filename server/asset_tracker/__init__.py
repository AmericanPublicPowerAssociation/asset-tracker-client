from pyramid.config import Configurator

from pyramid.request import Request
from pyramid.request import Response


def main(global_config, **settings):
    """
        This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        config.scan()
    # !!! QUICKFIX
    config.set_request_factory(request_factory)
    return config.make_wsgi_app()


def request_factory(environ):
    request = Request(environ)
    # !!! QUICKFIX DO NOT USE IN PRODUCTION
    if request.is_xhr:
        request.response = Response()
        request.response.headerlist = []
        request.response.headerlist.extend(
            (
                ('Access-Control-Allow-Origin', '*'),
            )
        )
    return request
