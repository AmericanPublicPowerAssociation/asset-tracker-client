from geoalchemy2 import Geometry
from sqlalchemy import (
    Column, ForeignKey, Table, create_engine)
from sqlalchemy.event import listen
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, select
from sqlalchemy.types import Integer, PickleType, String


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


class AssetType(Base):
    __tablename__ = 'asset_type'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('asset_type.id'))
    name = Column(String)


class Asset(Base):
    __tablename__ = 'asset'
    id = Column(Integer, primary_key=True)
    identifier = Column(String, unique=True)
    utility_id = Column(Integer, ForeignKey('utility.id'))
    type_id = Column(Integer, ForeignKey('asset_type.id'))
    vendor_id = Column(Integer, ForeignKey('vendor.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    version_id = Column(Integer, ForeignKey('product_version.id'))
    parent_id = Column(Integer, ForeignKey('asset.id'))
    name = Column(String)
    geometry = Geometry(management=True, use_st_prefix=False)
    properties = PickleType()
    connections = relationship(
        'asset',
        secondary=AssetConnection,
        primaryjoin=AssetConnection.c.l_asset_id == id,
        secondaryjoin=AssetConnection.c.r_asset_id == id)


def load_spatialite(connection, record):
    connection.enable_load_extension(True)
    connection.load_extension('/usr/lib64/mod_spatialite.so')


engine = create_engine('sqlite:///:memory:', echo=True)
listen(engine, 'connect', load_spatialite)
connection = engine.connect()
connection.execute(select([func.InitSpatialMetaData()]))
Base.metadata.create_all(engine)


# Make data
# Get assets
# make network
# run power flow
# save tables as csv
