import pytest
from models import Asset


@pytest.fixture
def asset1():
    return Asset(id=1)


@pytest.fixture
def asset2():
    return Asset(id=2)
