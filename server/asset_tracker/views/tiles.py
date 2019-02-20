from pyramid.view import view_config
from pyramid.response import Response

from tile_server import helper

@view_config(route_name='tiles')
def tiles(request):
	x = int(request.matchdict['x'])
	y = int(request.matchdict['y'])
	z = int(request.matchdict['z'])
	bounds = helper.indices_to_bounds(x, y, z)
	pbf = helper.geojson_to_pfb()
	return Response( 'West: ' + str(bounds.west) + ', South: ' + str(bounds.south) + ', East: ' + str(bounds.east) + ', North: ' + str(bounds.north)  + '\n\n' + str(pbf))
