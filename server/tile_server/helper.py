import pkgutil
import geojson
import mercantile
import mapbox_vector_tile

from geojson import Feature, FeatureCollection

from shapely import wkt
from shapely.geometry import box, shape, GeometryCollection

def load_dataset ():
    data = pkgutil.get_data('tile_server', 'line.geojson')
    data_geojson = geojson.loads(data)
    geometries = []

    for feature in data_geojson['features']:
        geometries.append(shape(feature['geometry']))

    return GeometryCollection(geometries)

def indices_to_bounds (x, y, z):
    return mercantile.bounds(x, y, z)

def bound_dataset (dataset, bounds):
    bound_box = box(bounds.west, bounds.south, bounds.east, bounds.north)
    # test case:
    # bound_box = box(-79.656855, 36.18200, -79.50, 36.31)

    bounded_dataset = dataset.intersection(bound_box)
    feature_array = []
    for line in bounded_dataset: 
        feature_array.append({"properties": {}, "geometry" : line.wkt})

    return FeatureCollection(feature_array)


def geojson_to_pfb (geojson, bounds):
    geojson['name'] = 'line'
    return mapbox_vector_tile.encode(geojson, quantize_bounds=(bounds.west, bounds.south, bounds.east, bounds.north))
