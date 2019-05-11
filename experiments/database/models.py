import enum
from geoalchemy2 import Geometry
from geoalchemy2.shape import to_shape
from sqlalchemy import Column, ForeignKey, Table, create_engine
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.types import Enum, PickleType, String


AssetContent = Table(
    'asset_content', Base.metadata,
    Column('parent_asset_id', String, ForeignKey('asset.id')),
    Column('child_asset_id', String, ForeignKey('asset.id')))
AssetConnection = Table(
    'asset_connection', Base.metadata,
    Column('left_asset_id', String, ForeignKey('asset.id')),
    Column('right_asset_id', String, ForeignKey('asset.id')))


class User(Base):
    utility_roles = [
        (utility_id, role_index),
    ]


class UserRole(enum.IntEnum):
    Spectator = 0
    Member = 1
    Leader = 2
    Administrator = 3


class Asset(Base):
    _contents = relationship(
        'Asset', secondary=AssetContent,
        primaryjoin=AssetContent.c.parent_asset_id == id,
        secondaryjoin=AssetContent.c.child_asset_id == id,
        backref='containers')
    _connections = relationship(
        'Asset', secondary=AssetConnection,
        primaryjoin=AssetConnection.c.left_asset_id == id,
        secondaryjoin=AssetConnection.c.right_asset_id == id)
    _geometry = Column(Geometry(management=True, use_st_prefix=False))
    # _geometry = Column(Geometry(srid=4326))

    def __init__(self, **kwargs):
        if 'geometry' in kwargs:
            geometry = kwargs.pop('geometry')
            kwargs['_geometry'] = geometry.wkt
        super(Asset, self).__init__(**kwargs)

    @property
    def contained_assets(self):
        return self._contents

    @property
    def connected_assets(self):
        return self._connections

    @property
    def geometry(self):
        return to_shape(self._geometry)

    @geometry.setter
    def geometry(self, g):
        self._geometry = g.wkt

    def add_content(self, asset):
        if self == asset:
            return
        if asset not in self._contents:
            self._contents.append(asset)

    def add_connection(self, asset):
        if self == asset:
            return
        if asset not in self._connections:
            self._connections.append(asset)
        if self not in asset._connections:
            asset._connections.append(self)

    def remove_content(self, asset):
        if asset in self._contents:
            self._contents.remove(asset)

    def remove_connection(self, asset):
        if asset in self._connections:
            self._connections.remove(asset)
        if self in asset._connections:
            asset._connections.remove(self)


def configure_database(database_url):
    engine = create_engine(database_url)
    load_spatialite_sqlite_extension(engine)
    Base.metadata.create_all(engine)
    DatabaseSession = sessionmaker(bind=engine)
    DatabaseSession.configure(bind=engine)
    return DatabaseSession()


def load_spatialite_sqlite_extension(engine):
    from sqlalchemy.event import listen
    from sqlalchemy.sql import func, select

    def load_spatialite(api_connection, connection_record):
        api_connection.enable_load_extension(True)
        api_connection.load_extension('/usr/lib64/mod_spatialite.so')

    listen(engine, 'connect', load_spatialite)
    engine_connection = engine.connect()
    engine_connection.execute(select([func.InitSpatialMetaData()]))
    engine_connection.close()
