const locatingAssetId = locatingAsset.get('id')
const editingAssetId = locatingAssetId || relatingAssetId
const editingAsset = locatingAssetId ? locatingAsset : relatingAsset
const editingAttributeName = locatingAssetId ? 'Location' : {}[relatingAssetKey]

const selectedAssetCount = selectedAssetIds.count()
const applicationTitle = selectedAssetCount ?
  `Selected ${selectedAssetCount} Assets` :
  editingAssetId ?
    `Editing ${editingAttributeName} for ${editingAssetName}` :
    'Asset Tracker'

<AppBar color={selectedAssetCount ? 'primary' : editingAssetId ? 'secondary' : 'default'}>
  <Toolbar>
    <IconButton >
      <Badge badgeContent={vulnerableAssets.length ? vulnerableAssets.length : ''} color='error'>
      </Badge>
    </IconButton>
  </Toolbar>
</AppBar>
