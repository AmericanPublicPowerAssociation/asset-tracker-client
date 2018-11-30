import enum
from geoalchemy2 import Geometry
from sqlalchemy import (
    Column, ForeignKey, Table, create_engine)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.types import Enum, Integer, PickleType, String
from contextlib import contextmanager


Base = declarative_base()
OrganizationMember = Table(
    'organization_member', Base.metadata,
    Column('parent_id', String, ForeignKey('organization.id')),
    Column('child_id', String, ForeignKey('organization.id')))
AssetConnection = Table(
    'asset_connection', Base.metadata,
    Column('l_asset_id', String, ForeignKey('asset.id')),
    Column('r_asset_id', String, ForeignKey('asset.id')))


class AssetType(enum.IntEnum):
    Pole = 1
    Meter = 2
    Line = 3
    Switch = 4
    Busbar = 5
    Transformer = 6
    Substation = 7
    Station = 8
    Other = 0


class UserRole(enum.IntEnum):
    Leader = 1
    Member = 2
    Spectator = 3


class Organization(Base):
    __tablename__ = 'organization'
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    member_organizations = relationship(
        'Organization', secondary=OrganizationMember,
        primaryjoin=OrganizationMember.c.parent_id == id,
        secondaryjoin=OrganizationMember.c.child_id == id)


class User(Base):
    __tablename__ = 'user'
    id = Column(String, primary_key=True)
    organization_id = Column(String, ForeignKey('organization.id'))
    name = Column(String, nullable=False)
    email = Column(String)
    role = Column(Enum(UserRole))


class Vendor(Base):
    __tablename__ = 'vendor'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)


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


class AssetSubType(Base):
    __tablename__ = 'asset_subtype'
    id = Column(Integer, primary_key=True)
    type_id = Column(Enum(AssetType))
    parent_id = Column(Integer, ForeignKey('asset_subtype.id'))
    name = Column(String)


class Asset(Base):
    __tablename__ = 'asset'
    id = Column(String, primary_key=True)
    organization_id = Column(String, ForeignKey('organization.id'))
    type_id = Column(Enum(AssetType))
    subtype_id = Column(Integer, ForeignKey('asset_subtype.id'))
    vendor_id = Column(Integer, ForeignKey('vendor.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    version_id = Column(Integer, ForeignKey('product_version.id'))
    parent_id = Column(String, ForeignKey('asset.id'))
    name = Column(String)
    geometry = Column(Geometry('POINT', srid=4326))
    properties = PickleType()
    connected_assets = relationship(
        'Asset', secondary=AssetConnection,
        primaryjoin=AssetConnection.c.l_asset_id == id,
        secondaryjoin=AssetConnection.c.r_asset_id == id)


engine = create_engine('postgresql:///asset-tracker', echo=True)
Base.metadata.create_all(engine)
DatabaseSession = sessionmaker(bind=engine)
DatabaseSession.configure(bind=engine)


@contextmanager
def database_connection(*args, **kwds):
    db = DatabaseSession()
    try:
        yield db
        db.commit()
    finally:
        db.close()
