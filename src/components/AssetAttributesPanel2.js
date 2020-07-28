// TODO: Review from scratch

import React from 'react'
import { useSelector } from 'react-redux'
import AssetAttributesListItem from './AssetAttributesListItem'
import AssetConnectionsListItems from './AssetConnectionsListItems'
import {
  getIsViewing,
} from '../selectors'

export default function AssetAttributesPanel({
  asset,
  setIsDetailsWindowExpanded,
  isDetailsWindowExpanded,
}) {
  const isViewing = useSelector(getIsViewing)
  const isEditing = !isViewing

  return (
    <>
      <AssetAttributesListItem
        asset={asset}
        isEditing={isEditing}
      />
      <AssetConnectionsListItems
        asset={asset}
        isEditing={isEditing}
        expand={isDetailsWindowExpanded}
      />
    </>
  )
}
