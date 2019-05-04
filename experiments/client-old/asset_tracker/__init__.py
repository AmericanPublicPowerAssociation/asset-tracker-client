from pyramid.config import Configurator


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.add_route('home', '/')
    config.add_route('assets', '/assets')
    config.add_route('center.json', '/center.json')
    config.add_route('save.json', '/save.json')
    config.add_route('delete.json', '/delete.json')
    config.add_route('search.json', '/search.json')
    config.add_route('assets.json', '/assets.json')
    config.add_static_view('static', 'views/templates/static')
    config.scan('.views')
    return config.make_wsgi_app()
