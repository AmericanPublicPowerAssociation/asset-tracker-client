import numpy as np
import pypsa
import random
import string

from models import Asset, AssetType, db


try:
    ALPHABET = string.digits + string.letters
except AttributeError:
    ALPHABET = string.digits + string.ascii_letters
RANDOM = random.SystemRandom()


def make_random_string(length, alphabet=ALPHABET):
    return ''.join(RANDOM.choice(alphabet) for x in range(length))


def make_asset(type_id, name, **kw):
    asset_id = make_random_string(16)
    asset = Asset(id=asset_id, type_id=type_id, name=name, **kw)
    db.add(asset)
    db.commit()
    return asset


bus0 = make_asset(
    AssetType.Busbar, 'Bus 0', properties={
        'nominal_voltage_in_kv': 20})
bus1 = make_asset(
    AssetType.Busbar, 'Bus 1', properties={
        'nominal_voltage_in_kv': 20})
bus2 = make_asset(
    AssetType.Busbar, 'Bus 2', properties={
        'nominal_voltage_in_kv': 20})


line0 = make_asset(
    AssetType.Line, 'Line 0',
    connected_assets=[bus0, bus1], properties={
        'series_reactance_in_ohm': 0.1,
        'series_resistance_in_ohm': 0.01})
line1 = make_asset(
    AssetType.Line, 'Line 1',
    connected_assets=[bus1, bus2], properties={
        'series_reactance_in_ohm': 0.1,
        'series_resistance_in_ohm': 0.01})
line2 = make_asset(
    AssetType.Line, 'Line 2',
    connected_assets=[bus2, bus0], properties={
        'series_reactance_in_ohm': 0.1,
        'series_resistance_in_ohm': 0.01})


station0 = make_asset(
    AssetType.Station, 'Station 0',
    connected_assets=[bus0], properties={
        'active_power_set_point_in_mw': 100,
        'control_strategy': 'PQ'})


meter0 = make_asset(
    AssetType.Meter, 'Meter 0',
    connected_assets=[bus1], properties={
        'active_power_consumption_in_mw': 100,
        'reactive_power_consumption_in_mvar': 100})


network = pypsa.Network()
for asset in db.query(Asset).filter_by(type_id=AssetType.Busbar):
    d = asset.properties
    network.add(
        'Bus', asset.name,
        v_nom=d['nominal_voltage_in_kv'])
for asset in db.query(Asset).filter_by(type_id=AssetType.Line):
    c = asset.connected_assets
    d = asset.properties
    network.add(
        'Line', asset.name,
        bus0=c[0].name,
        bus1=c[1].name,
        x=d['series_reactance_in_ohm'],
        r=d['series_resistance_in_ohm'])
for asset in db.query(Asset).filter_by(type_id=AssetType.Station):
    c = asset.connected_assets
    d = asset.properties
    network.add(
        'Generator', asset.name,
        bus=c[0].name,
        p_set=d['active_power_set_point_in_mw'],
        control=d['control_strategy'])
for asset in db.query(Asset).filter_by(type_id=AssetType.Meter):
    c = asset.connected_assets
    d = asset.properties
    network.add(
        'Load', asset.name,
        bus=c[0].name,
        p_set=d['active_power_consumption_in_mw'],
        q_set=d['reactive_power_consumption_in_mvar'])
# print(network.buses)
# print(network.lines)
# print(network.generators)
# print(network.generators.p_set)
# print(network.loads)
# print(network.loads.p_set)
network.pf()
print(network.lines_t.p0)
print(network.buses_t.v_ang * 180 / np.pi)
print(network.buses_t.v_mag_pu)

# TODO: Extract tables as csv
