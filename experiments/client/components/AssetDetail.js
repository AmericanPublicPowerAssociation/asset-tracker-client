const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})

const focusingAssetId = focusingAsset.get('id');
if (!focusingAssetId) return null
const locatable = focusingAssetType['locatable'] || false

{locatable && <AssetLocationContainer />}
