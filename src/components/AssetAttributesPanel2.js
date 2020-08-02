// TODO: Review from scratch

import React from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import AssetAttributesListItem from './AssetAttributesListItem'
import AssetConnectionsListItems from './AssetConnectionsListItems'
import CollapsibleTaskList from './CollapsibleTaskList'
import {
  getIsViewing,
} from '../selectors'

export default function AssetAttributesPanel({
  asset,
  isDetailsWindowFullScreen,
}) {
  const isViewing = useSelector(getIsViewing)
  const isEditing = !isViewing

  return (
    <List component='div'>
      <AssetAttributesListItem
        asset={asset}
        isEditing={isEditing}
      />
      <AssetConnectionsListItems
        asset={asset}
        isEditing={isEditing}
        isDetailsWindowFullScreen={isDetailsWindowFullScreen}
      />
      <CollapsibleTaskList asset={asset} />
    </List>
  )
}
