import mapbox_vector_tile as mvt
import mercantile
from geotable.projections import (
    get_transform_shapely_geometry,
    LONGITUDE_LATITUDE_PROJ4,
    SPHERICAL_MERCATOR_PROJ4)
from pyramid.view import view_config
from pyramid.response import Response
from shapely.geometry import GeometryCollection, LineString, box

# from tile_server import helper


transform_shapely_geometry = get_transform_shapely_geometry(
    LONGITUDE_LATITUDE_PROJ4, SPHERICAL_MERCATOR_PROJ4)


line = LineString([
    [-122.48369693756104, 37.83381888486939],
    [-122.48348236083984, 37.83317489144141],
    [-122.48339653015138, 37.83270036637107],
    [-122.48356819152832, 37.832056363179625],
    [-122.48404026031496, 37.83114119107971],
    [-122.48404026031496, 37.83049717427869],
    [-122.48348236083984, 37.829920943955045],
    [-122.48356819152832, 37.82954808664175],
    [-122.48507022857666, 37.82944639795659],
    [-122.48610019683838, 37.82880236636284],
    [-122.48695850372314, 37.82931081282506],
    [-122.48700141906738, 37.83080223556934],
    [-122.48751640319824, 37.83168351665737],
    [-122.48803138732912, 37.832158048267786],
    [-122.48888969421387, 37.83297152392784],
    [-122.48987674713133, 37.83263257682617],
    [-122.49043464660643, 37.832937629287755],
    [-122.49125003814696, 37.832429207817725],
    [-122.49163627624512, 37.832564787218985],
    [-122.49223709106445, 37.83337825839438],
    [-122.49378204345702, 37.83368330777276],
])


@view_config(route_name='tiles')
def tiles(request):
    x = int(request.matchdict['x'])
    y = int(request.matchdict['y'])
    zoom = int(request.matchdict['zoom'])
    tile_bounds = mercantile.bounds(x, y, zoom)
    ll_box = box(*tile_bounds)
    sm_box = transform_shapely_geometry(ll_box)

    g = line
    transformed_geometry = transform_shapely_geometry(g)

    if not sm_box.intersection(transformed_geometry).is_empty:
        layers = [{
            'name': 'example',
            'features': [{
                'geometry': transformed_geometry,
                'properties': {},
            }],
        }]
        pbf = mvt.encode(layers, quantize_bounds=sm_box.bounds)
        x = mvt.decode(pbf)
        print(x)
    else:
        pbf = mvt.encode([])
    response = Response(pbf)
    response.content_type = 'application/x-protobuf'
    return response


@view_config(route_name='test_geobuf')
def test_geobuf(request):
    import geobuf
    pbf = geobuf.encode(EXAMPLE_GEOJSON)
    response = Response(pbf)
    response.content_type = 'application/x-protobuf'
    return response


@view_config(route_name='test_geojson', renderer='json')
def test_geojson(request):
    return EXAMPLE_GEOJSON


@view_config(route_name='test', renderer='../templates/map-test.jinja2')
def test(request):
    return {}


EXAMPLE_GEOJSON = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
        'type': 'LineString',
        'coordinates': [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276]
        ]
    }
}


EXAMPLE_MAPBOX_VECTOR_TILE = ''
