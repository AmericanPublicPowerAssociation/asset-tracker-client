from geoalchemy2 import Geometry
from sqlalchemy import (
    Column, ForeignKey, Table, create_engine)
from sqlalchemy.event import listen
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.sql import func, select
from sqlalchemy.types import Enum, Integer, PickleType, String
import enum


Base = declarative_base()
AssetConnection = Table(
    'asset_connection', Base.metadata,
    Column('l_asset_id', Integer, ForeignKey('asset.id')),
    Column('r_asset_id', Integer, ForeignKey('asset.id')))


class Utility(Base):
    __tablename__ = 'utility'
    id = Column(Integer, primary_key=True)
    identifier = Column(String, unique=True)
    name = Column(String)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    identifier = Column(String, unique=True)
    utility_id = Column(Integer, ForeignKey('utility.id'))
    name = Column(String)
    email = Column(String)


class Vendor(Base):
    __tablename__ = 'vendor'
    id = Column(Integer, primary_key=True)
    name = Column(String)


class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    vendor_id = Column(Integer, ForeignKey('vendor.id'))
    name = Column(String)


class ProductVersion(Base):
    __tablename__ = 'product_version'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('product.id'))
    version = Column(String)


class AssetType(enum.Enum):
    Pole = 1
    Meter = 2
    Line = 3
    Switch = 4
    Busbar = 5
    Tranformer = 6
    Substation = 7


class AssetSubType(Base):
    __tablename__ = 'asset_subtype'
    id = Column(Integer, primary_key=True)
    type_id = Column(Enum(AssetType))
    parent_id = Column(Integer, ForeignKey('asset_subtype.id'))
    name = Column(String)


class Asset(Base):
    __tablename__ = 'asset'
    id = Column(Integer, primary_key=True)
    identifier = Column(String, unique=True)
    utility_id = Column(Integer, ForeignKey('utility.id'))
    type_id = Column(Enum(AssetType))
    subtype_id = Column(Integer, ForeignKey('asset_subtype.id'))
    vendor_id = Column(Integer, ForeignKey('vendor.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    version_id = Column(Integer, ForeignKey('product_version.id'))
    parent_id = Column(Integer, ForeignKey('asset.id'))
    name = Column(String)
    geometry = Geometry(management=True, use_st_prefix=False)
    properties = PickleType()
    connections = relationship(
        'Asset',
        secondary=AssetConnection,
        primaryjoin=AssetConnection.c.l_asset_id == id,
        secondaryjoin=AssetConnection.c.r_asset_id == id)


def load_spatialite(sqlite3_connection, _):
    sqlite3_connection.enable_load_extension(True)
    sqlite3_connection.load_extension('/usr/lib64/mod_spatialite.so')


engine = create_engine('sqlite:///:memory:', echo=True)
listen(engine, 'connect', load_spatialite)
engine_connection = engine.connect()
engine_connection.execute(select([func.InitSpatialMetaData()]))
Base.metadata.create_all(engine)
DatabaseSession = sessionmaker(bind=engine)
DatabaseSession.configure(bind=engine)
db = DatabaseSession()


for asset_subtype in [
    AssetSubType(id=1, type_id=AssetType.Meter, name='Residential Meter'),
    AssetSubType(id=2, type_id=AssetType.Meter, name='Commercial Meter'),
    AssetSubType(id=3, type_id=AssetType.Meter, name='Industrial Meter'),
    AssetSubType(id=4, type_id=AssetType.Line, name='Overhead Line'),
    AssetSubType(id=5, type_id=AssetType.Line, name='Underground Line'),
    AssetSubType(id=6, type_id=AssetType.Switch, name='Circuit Breaker'),
    AssetSubType(id=7, type_id=AssetType.Switch, name='Recloser'),
    AssetSubType(id=8, type_id=AssetType.Switch, name='Relay'),
]:
    db.add(asset_subtype)
    db.commit()
