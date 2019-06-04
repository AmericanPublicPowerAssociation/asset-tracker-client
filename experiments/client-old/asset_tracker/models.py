OrganizationMember = Table(
    'organization_member', Base.metadata,
    Column('parent_id', String, ForeignKey('organization.id')),
    Column('child_id', String, ForeignKey('organization.id')))


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


class AssetSubType(Base):
    __tablename__ = 'asset_subtype'
    id = Column(Integer, primary_key=True)
    type_id = Column(Enum(AssetType))
    parent_id = Column(Integer, ForeignKey('asset_subtype.id'))
    name = Column(String)


class Asset(Base):
    __tablename__ = 'asset'
    organization_id = Column(String, ForeignKey('organization.id'))
    subtype_id = Column(Integer, ForeignKey('asset_subtype.id'))
