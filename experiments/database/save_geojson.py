import geopy
import geotable
import numpy as np
from geotable.projections import get_transform_shapely_geometry
from invisibleroads_macros.disk import make_unique_folder, uncompress
from os.path import exists, join, splitext
from shapely.geometry import Point
from urllib.request import urlretrieve


geometry_columns = [
    'geometry_layer',
    'geometry_proj4',
    'geometry_object']
target_folder = make_unique_folder('/tmp')


g = geopy.GoogleV3('AIzaSyDNqc0tWzXHx_wIp1w75-XTcCk4BSphB5w').geocode
location = g('Greensboro, NC')
p = Point(location.longitude, location.latitude)
proj4s = open('proj4s.txt').read().splitlines()
target_proj4 = geotable.LONGITUDE_LATITUDE_PROJ4


archive_url = (
    'https://egriddata.org/sites/default/files/'
    'GSO_RNM_GIS_Network.zip')
archive_path = '/tmp/greensboro-synthetic-network.zip'
archive_folder = splitext(archive_path)[0]
if not exists(archive_path):
    urlretrieve(archive_url, archive_path)
if not exists(archive_folder):
    archive_folder = uncompress(archive_path)
source_folder = join(archive_folder, 'GSO_RNM_GIS_Network', 'Rural')


source_path = join(source_folder, 'Line_N.shp')
t = line_table = geotable.load(source_path)


source_geometry = t.geometries[0]
target_geometry = p
best_index = 0
best_distance = np.inf
for index, proj4 in enumerate(proj4s):
    f = get_transform_shapely_geometry(proj4, target_proj4)
    distance = p.distance(f(source_geometry))
    if distance < best_distance:
        best_index = index
        best_distance = distance
best_proj4 = proj4s[best_index]


def save_geojson(target_name, source_name, target_columns):
    t = geotable.load(
        join(source_folder, source_name),
        source_proj4=best_proj4,
        target_proj4=target_proj4)
    target_path = join(target_folder, target_name)
    t[target_columns + geometry_columns].to_geojson(target_path)
    print(target_path)


save_geojson('line.geojson', 'Line_N.shp', [
    'Code', 'NomV', 'Phases'])
save_geojson('meter.geojson', 'NewConsumerGreenfield_N.shp', [
    'Code', 'NVolt_kV', 'Yearly_kWh'])
save_geojson('switch.geojson', 'SwitchingDevices_N.shp', [
    'Code', 'Type', 'NomV_kV'])
save_geojson('quality.geojson', 'VoltageRegulator_N.shp', [
    'Code', 'InvC'])
save_geojson('transformer.geojson', 'Transformer_N.shp', [
    'Code', 'Vnom1', 'Vnom2'])
save_geojson('substation.geojson', 'HVMVSubstation_N.shp', [
    'Code'])
