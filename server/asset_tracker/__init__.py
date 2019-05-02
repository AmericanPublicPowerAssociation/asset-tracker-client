def request_factory(environ):
    # !!! QUICKFIX DO NOT USE IN PRODUCTION
    # Use only if in development mode not production
    request = Request(environ)
    request.response = Response()
    request.response.headerlist = []
    request.response.headerlist.extend(
        (
            ('Access-Control-Allow-Origin', '*'),
        )
    )
    return request
