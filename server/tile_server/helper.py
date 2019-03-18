import pkgutil
import geojson
import mercantile
import mapbox_vector_tile

from geojson import Feature, FeatureCollection

from shapely import wkt
from shapely.geometry import box, shape, GeometryCollection, LineString

def load_dataset ():
    # data = pkgutil.get_data('tile_server', 'example.geojson')
    # data_geojson = geojson.loads(data)
    # geometries = []
    # for feature in data_geojson['features']:
        # geometries.append(shape(feature['geometry']))

    geometries = [
        LineString([
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
        ]),
    ]
    return GeometryCollection(geometries)

def indices_to_bounds (x, y, z):
    return mercantile.bounds(x, y, z)

def bound_dataset (dataset, bounds):
    # convert dataset to spherical mercator
    # convert bounds to spherical mercator
    # get intersection
    # return protocol buffer with quantize bounds

    bound_box = box(bounds.west, bounds.south, bounds.east, bounds.north)
    # get bounding box in spherical mercator
    # send spherical mercator bounding box to quantize bounds

    bounded_dataset = dataset.intersection(bound_box)
    feature_array = []
    for g in bounded_dataset: 
        # convert geometry from lon lat to spherical mercator
        feature_array.append({"properties": {}, "geometry" : g})

    return feature_array


def geojson_to_pfb(geojson, bounds):
    x = [{
        'name': 'line',
        'features': geojson,
    }]
    return mapbox_vector_tile.encode(geojson, quantize_bounds=(bounds.west, bounds.south, bounds.east, bounds.north))
