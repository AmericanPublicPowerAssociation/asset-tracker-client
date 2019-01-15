from pyramid.view import view_config, view_defaults


@view_defaults(renderer=__name__ + ':templates/index.jinja2')
class Home:
    def __init__(self, request):
        self.request = request

    @view_config(route_name='home')
    def home(self):
        return {}

    @view_config(route_name='assets')
    def assets(self):
        return {}
