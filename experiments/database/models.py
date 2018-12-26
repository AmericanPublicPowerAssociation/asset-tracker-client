import enum
from geoalchemy2 import Geometry
from sqlalchemy import Column, ForeignKey, Table, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.types import Enum, PickleType, String


Base = declarative_base()
AssetContent = Table(
    'asset_content', Base.metadata,
    Column('parent_asset_id', String, ForeignKey('asset.id')),
    Column('child_asset_id', String, ForeignKey('asset.id')))
AssetConnection = Table(
    'asset_connection', Base.metadata,
    Column('left_asset_id', String, ForeignKey('asset.id')),
    Column('right_asset_id', String, ForeignKey('asset.id')))


"""
class User(Base):
    utility_roles = [
        (utility_id, role_index),
    ]
"""


class UserRole(enum.IntEnum):
    Spectator = 0
    Member = 1
    Leader = 2
    Administrator = 3


class AssetType(enum.IntEnum):
    Station = 0
    Substation = 1
    Quality = 2
    Switch = 3
    Transformer = 4
    Meter = 5
    Line = 6
    Pole = 7
    Busbar = 8
    Control = 9
    Miscellaneous = 10


class Asset(Base):
    __tablename__ = 'asset'
    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    type_id = Column(Enum(AssetType))
    subtype_id = Column(String, ForeignKey('asset_subtype.id'))
    utility_id = Column(String)
    # geometry = Column(Geometry(srid=4326))
    geometry = Column(Geometry(
        srid=4326, management=True, use_st_prefix=False))
    properties = PickleType()
    contained_assets = relationship(
        'Asset', secondary=AssetContent,
        primaryjoin=AssetContent.c.parent_asset_id == id,
        secondaryjoin=AssetContent.c.child_asset_id == id)
    connected_assets = relationship(
        'Asset', secondary=AssetConnection,
        primaryjoin=AssetConnection.c.left_asset_id == id,
        secondaryjoin=AssetConnection.c.right_asset_id == id)


class AssetSubType(Base):
    __tablename__ = 'asset_subtype'
    id = Column(String, primary_key=True)
    name = Column(String)
    type_id = Column(Enum(AssetType))


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


engine = create_engine('sqlite://', echo=True)
load_spatialite_sqlite_extension(engine)
Base.metadata.create_all(engine)
DatabaseSession = sessionmaker(bind=engine)
DatabaseSession.configure(bind=engine)
database = DatabaseSession()
