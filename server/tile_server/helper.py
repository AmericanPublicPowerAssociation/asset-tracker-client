import pkgutil
import mercantile
import mapbox_vector_tile

def load_dataset():
    return pkgutil.get_data('tile_server', 'line.geojson')

def indices_to_bounds(x, y, z):
    return mercantile.bounds(x, y, z)

def geojson_to_pfb(geojson = [{"name": "test", "type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"id": "meter1", "radius": 3 }, "geometry": {"type": "Point", "coordinates": [-74.0059728, 40.7127753] } }, {"type": "Feature", "properties": {"id": "meter2", "radius": 4 }, "geometry": {"type": "Point", "coordinates": [-104.990251, 39.7392358] } }, {"type": "Feature", "properties": {"id": "meter3", "radius": 5 }, "geometry": {"type": "Point", "coordinates": [-122.6587185, 45.5122308] } }, {"type": "Feature", "properties": {"id": "meter4", "radius": 6 }, "geometry": {"type": "Point", "coordinates": [-80.1917902, 25.7616798] } }, {"type": "Feature", "properties": {"id": "meter5", "radius": 7 }, "geometry": {"type": "Point", "coordinates": [-83.7430378, 42.2808256] } } ] }]):
    return mapbox_vector_tile.encode(geojson)
