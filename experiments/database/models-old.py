from contextlib import contextmanager
from sqlalchemy import Column, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.types import Integer, String


Base = declarative_base()


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


class Asset(Base):
    vendor_id = Column(Integer, ForeignKey('vendor.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    version_id = Column(Integer, ForeignKey('product_version.id'))

    # _ intermediate_assets
    # _ terminal_assets
    # _ supported_assets
    # _ auxiliary_assets
    # contained_assets --> contents
    # connected_assets --> connections

    # _ line.contents
    # _ line.connections
    # line.contained_assets = poles
    # line.connected_assets


engine = create_engine('postgresql:///asset_tracker', echo=True)
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
