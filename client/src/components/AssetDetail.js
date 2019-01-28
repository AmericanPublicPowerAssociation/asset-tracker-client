import React from 'react'
import TextField from '@material-ui/core/TextField'

const AssetDetail = props => {
  const { assetById, highlightedAssetId } = props
  const asset = assetById[highlightedAssetId]
  return (
    <form>
      <TextField
        label="Name"
        value={(asset && asset.name) || ''}
        required
        InputProps={{ readOnly: true }}
      />
    </form>
  )
}

export default AssetDetail
