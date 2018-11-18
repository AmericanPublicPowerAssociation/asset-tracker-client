# import numpy as np
import pypsa

from models import Asset, AssetType, db


def make_asset(type_id, **kw):
    asset = Asset(type_id=type_id, **kw)
    db.add(asset)
    db.commit()
    return asset


bus0 = make_asset(AssetType.Busbar, name='Bus 0')
bus1 = make_asset(AssetType.Busbar, name='Bus 1')
bus2 = make_asset(AssetType.Busbar, name='Bus 1')
line0 = make_asset(AssetType.Line, name='Line 0', connections=[bus0, bus1])
line1 = make_asset(AssetType.Line, name='Line 1', connections=[bus1, bus2])
line2 = make_asset(AssetType.Line, name='Line 2', connections=[bus2, bus0])


# Get assets
# Make network

network = pypsa.Network()

# Run power flow
# Save tables as csv
