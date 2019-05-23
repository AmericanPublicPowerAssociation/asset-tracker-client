from sqlalchemy import Column, ForeignKey, Table, create_engine
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.types import Enum, PickleType


class User(Base):
    utility_roles = [
        (utility_id, role_index),
    ]


class UserRole(enum.IntEnum):
    Spectator = 0
    Member = 1
    Leader = 2
    Administrator = 3
