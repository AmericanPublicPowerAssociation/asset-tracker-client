import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import DetailsDialog from './DetailsDialog'
import AssetDialogListItem from './AssetDialogListItem'
import {
  getAssetById
} from '../selectors' 


export default function AssetDialogList({searchString}) {
  const assetById = useSelector(getAssetById)
  const [showDetails, setShowDetails] = useState(false)
  const [showAssetId, setShowAssetID] = useState('')

  const handleShowDetailsDialog = (assetId) => {
    setShowAssetID(assetId)
    setShowDetails(true)
  }
  
  const handleCloseDetailsDialog = () => {
    setShowAssetID('')
    setShowDetails(false)
  }

  return (
    <List>
      {
        Object.keys(assetById).filter( (id) => {
          const asset = assetById[id]
          return asset.name.includes(searchString)
        }).map(assetKey => (
          <AssetDialogListItem 
            key={`asset-list-${assetKey}`}
            asset={assetById[assetKey]}
            handleShowDetailsDialog={handleShowDetailsDialog}
          />
        ))
      } 
      <DetailsDialog
        showDetails={showDetails}
        handleClose={handleCloseDetailsDialog}
        assetId={showAssetId}
      />

    </List>
  )
}
