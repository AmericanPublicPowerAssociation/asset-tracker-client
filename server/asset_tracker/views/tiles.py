from pyramid.view import view_config
from pyramid.response import Response, FileResponse

from tile_server import helper

@view_config(route_name='tiles')
def tiles (request):
	x = int(request.matchdict['x'])
	y = int(request.matchdict['y'])
	z = int(request.matchdict['z'])

	dataset = helper.load_dataset()

	bounds = helper.indices_to_bounds(x, y, z)
	bounded_dataset = helper.bound_dataset(dataset, bounds)
	pbf = helper.geojson_to_pfb(bounded_dataset, bounds)
	response = Response(pbf)
	response.content_type = 'application/x-protobuf'
	return response

@view_config(route_name="test", renderer='../templates/map-test.jinja2')
def test (request):
	return {}
