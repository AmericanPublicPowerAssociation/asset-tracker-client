def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('index', '/')
    config.add_route('tiles', '/tiles/{zoom}/{x}/{y}')
    config.add_route('test', '/test/server')
    config.add_route('test_geojson', '/test/server.geojson')
    config.add_route('test_geobuf', '/test/server.geobuf')
