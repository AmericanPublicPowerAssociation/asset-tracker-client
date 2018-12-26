from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class User(Base):
    """
    utility_roles = [
        (utility_id, role_index),
    ]
    """
    pass


class UserRole(enum.IntEnum):
    pass


class Asset(Base):
    pass


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


class AssetSubType(Base):
    Spectator = 0
    Member = 1
    Leader = 2
    Administrator = 3
