const selectedAssetCount = selectedAssetIds.count()
const applicationTitle = selectedAssetCount ? `Selected ${selectedAssetCount} Assets`

<AppBar color={selectedAssetCount ? 'primary'}>
  <Toolbar>
    <IconButton >
      <Badge badgeContent={vulnerableAssets.length ? vulnerableAssets.length : ''} color='error'>
      </Badge>
    </IconButton>
  </Toolbar>
</AppBar>
