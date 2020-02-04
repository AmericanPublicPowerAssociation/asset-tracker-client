import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import {
  setAssetConnectionAttribute
} from '../actions'


export default function AssetConnectionList(props) {
  const {
    asset
  } = props
  const connections = asset['connections'] || []
  const assetId = asset.id

  return (
    <List disablePadding>
      { connections.map( (conn, index) => (
        <AssetConnectionItem
          key={`asset-connection-item-${assetId}-${conn.busId}`}
          itemKey={`asset-connection-item-${assetId}`}
          connection={conn}
          connectionIndex={index}
          assetId={assetId}
        />
      ))} 
    </List>
  )
}


function AssetConnectionItem(props) {
  const [
    isWithExpandConnect,
    setIsWithExpandConnect
  ] = useState(false)
  const {
    connection,
    itemKey,
    connectionIndex,
    assetId,
  } = props
  const {
    busId,
    attributes,
  } = connection

  const dispatch = useDispatch()
  const arrowComponent = (
    isWithExpandConnect ?
    <ExpandLess /> :
    <ExpandMore />
  )

  const _onChange = (e, key) => {
    const val = e.target.value
    dispatch(
      setAssetConnectionAttribute(assetId, connectionIndex, key, val)
    )
  }

  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        onClick={ () => setIsWithExpandConnect(!isWithExpandConnect)}>
        <ListItemText primary={`Bus ${busId}`}/>
        { arrowComponent } 
      </ListItem>
      <Collapse key={`${itemKey}-collapse`} in={isWithExpandConnect}>
        {
          !attributes ?
          <Typography>Attributes are not available</Typography> :
          <List>
            {
              Object.keys(attributes).map( key => (
                <ListItem
                  key={`${itemKey}-atttributes-${key}`}
                >
                  <TextField
                    label={key}
                    size="small"
                    value={attributes[key]}
                    variant="outlined" 
                    onChange={ (e) => _onChange(e, key)}
                  />
                </ListItem>
              ))
            }
          </List>
        }
      </Collapse>
    </>
  )
}
