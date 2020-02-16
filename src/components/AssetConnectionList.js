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
    asset,
    disableInput,
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
          disableInput={disableInput}
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
    disableInput,
  } = props
  const {
    // busId,
    attributes,
  } = connection

  const dispatch = useDispatch()
  const arrowComponent = (
    isWithExpandConnect ?
    <ExpandLess /> :
    <ExpandMore />
  )

  const handleChange = (e, key) => {
    const value = e.target.value
    dispatch(setAssetConnectionAttribute(assetId, connectionIndex, key, value)
    )
  }

  const getKeyLabel = (key) => {
    return key.replace( /([A-Z])/g, ' $1' ).toLowerCase()
  }

  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        onClick={ () => setIsWithExpandConnect(!isWithExpandConnect)}>
        <ListItemText primary={`Bus ${connectionIndex}`}/>
        { arrowComponent } 
      </ListItem>

      <Collapse key={`${itemKey}-collapse`} in={isWithExpandConnect}>
        {
          !attributes ?
          <Typography display='block' align='center' variant='caption'>
            Attributes are not available
          </Typography> :

          <List>
            {
              Object.keys(attributes).map( key => (
                <ListItem
                  disableGutters
                  key={`${itemKey}-atttributes-${key}`}
                >
                  <TextField
                    fullWidth
                    label={getKeyLabel(key)}
                    value={attributes[key]}
                    onChange={ (e) => handleChange(e, key)}
                    disabled={disableInput}
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