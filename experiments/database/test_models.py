class TestAsset(object):

    def test_contents(self, asset1, asset2):
        assert len(asset1.contained_assets) == 0
        asset1.add_content(asset1)
        assert len(asset1.contained_assets) == 0
        asset1.add_content(asset2)
        assert len(asset1.contained_assets) == 1
        asset1.remove_content(asset2)
        assert len(asset1.contained_assets) == 0

    def test_connections(self, asset1, asset2):
        assert len(asset1.connected_assets) == 0
        assert len(asset2.connected_assets) == 0
        asset1.add_connection(asset1)
        assert len(asset1.connected_assets) == 0
        assert len(asset2.connected_assets) == 0
        asset1.add_connection(asset2)
        assert len(asset1.connected_assets) == 1
        assert len(asset2.connected_assets) == 1
        asset1.remove_connection(asset2)
        assert len(asset1.connected_assets) == 0
        assert len(asset2.connected_assets) == 0
