import React, { useState } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
// import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
/*
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Divider from '@material-ui/core/Divider'
import StarBorder from '@material-ui/icons/StarBorder'
*/
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  ASSET_TYPE_BY_CODE,
  SKETCH_MODE_VIEW,
} from '../constants'
/*
import {
  LINE_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
  SUBSTATION_ASSET_TYPE_ID,
  METER_ASSET_TYPE_ID,
} from '../constants'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
*/
import {
  getFocusingAsset,
} from '../selectors'
import {
  // mergeAsset,
  // changeAsset,
} from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    // top: theme.spacing(8),
    right: theme.spacing(1),
    // width: theme.spacing(32),
    // width: theme.spacing(35),
    padding: theme.spacing(1),
  },
  /*
  icon: {
    margin: theme.spacing(1),
  },
  section: {
    marginTop: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(1),
  },
  form: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: '100%',
  },
  input: {
    width: '100%',
  },
  mimic: {
    border: 'none',
    boxShadow: 'none',
  },
  noPadding: {
    padding: 0,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  icon: {
    fontSize: '3.6em',
  },
  iconInner: {
    fontSize: '1.6em',
  },
  title: {
    fontSize: '1.6em',
  },
  connection: {
    fontWeight: 'bold',
  },
  emph: {
    fontStyle: 'italic',
    fontWeight: 400,
  },
  */
}))

export default function DetailsWindow(props) {
  const classes = useStyles()
  const {
    isWithDetails,
    sketchMode,
  } = props
  const focusingAsset = useSelector(getFocusingAsset)
  const detailsPanel = focusingAsset ?
    <AssetDetailsPanel
      asset={focusingAsset}
      sketchMode={sketchMode}
    /> :
    <EmptyDetailsPanel />
  return (
    <Paper className={clsx(classes.root, {
      poof: !isWithDetails,
    })}>
      {detailsPanel}
    </Paper>
  )
}

function AssetDetailsPanel(props) {
  const classes = useStyles()
  const {
    asset,
    sketchMode,
  } = props
  const [
    isWithExpandedDetails, setIsWithExpandedDetails,
  ] = useState(true)
  const [
    isWithExpandedConnections, setIsWithExpandedConnections,
  ] = useState(false)
  const assetName = asset.name
  const assetNameComponent = sketchMode === SKETCH_MODE_VIEW ?
    <ListItemText primary={assetName} /> :
    <TextField value={assetName} variant='outlined' />
  const assetTypeCode = asset.typeCode
  const assetType = ASSET_TYPE_BY_CODE[assetTypeCode]
  const assetTypeName = assetType.name

  // const classes = useStyles()
  // const dispatch = useDispatch()
  // const [busDetailsExpand, setBusDetailsExpand] = useState({})
  // const [connDetailsExpand, setConnDetailsExpand] = useState({})
  // const [filter, setFilter] = useState('')

  // const id = asset.id || null
  // const vendorName = asset['vendorName'] || null
  // const productName = asset['productName'] || null
  // const productVersion = asset['productVersion'] || null
  // const unique = asset['unique'] || null

  /*
  const _onChange = (e) => {
    const field = e.target.name
    const input = e.target.value
    const assetId = id
    // TODO: change assetById
  }
  */

  /*
  function trackChanges(attributes) {
    dispatch(mergeAsset({id, ...attributes}))
  }

  const _handleDetailsExpand = () => {
    setDetailsExpand(!detailsExpand)
  }

  const _handleBusesExpand = (bus) => {
    setBusDetailsExpand({
      ...busDetailsExpand,
      [bus]: !busDetailsExpand[bus]
    })
  }

  const _handleConnectionsExpand = (conn) => {
    setConnDetailsExpand({
      ...connDetailsExpand,
      [conn]: !connDetailsExpand[conn]
    })
  }

  const getFields = () => {
    const fields = []
    for (let key in asset) {
      if(asset.hasOwnProperty(key)){
        if (key === 'attributes') {
          fields.push(Object.keys(asset.attributes).map( key => (
            <div key={`${id}_attribute_${key}`}>
              <Typography>
                <label className={classes.emph}>{key}: </label>
                {asset.attributes[key]}
              </Typography>
            </div>
          )))
        }
        else if (key === 'busByIndex'){
          fields.push(Object.keys(asset.busByIndex).map( key => (
            <List component='nav'>
              <ListItem
                button
                onClick={ () => _handleBusesExpand(key) }
              >
                <ListItemText
                  primary={`Bus ${key}`}
                  primaryTypographyProps={{className: classes.title}}
                />
                { busDetailsExpand[key] ? <ExpandLess /> : <ExpandMore/> }
              </ListItem>
              <Collapse in={busDetailsExpand[key]} timeout='auto' unmountOnExit>
                { asset['electricalConnections'] &&
                  asset.electricalConnections.filter( conn => (
                  conn.bus_id === key
                ).map( (conn, index) => (
                  <List component='div' disablePadding>
                    <ListItem
                      button
                      className={classes.noGutters}
                      onClick={ () => _handleConnectionsExpand(key + index)}
                    >
                      <InboxIcon className={classes.iconInner} />
                      <ListItemText
                        primary={`Connected ${conn.asset_id}`}
                        primaryTypographyProps={{className: classes.connection}}
                      />
                        { connDetailsExpand[key + index] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={connDetailsExpand[key + index]} timeout='auto' unmountOnExit>
                      <List component='div'>
                        {
                          Object.keys(conn.attributes).filter( key => {
                            if (filter === '') return true
                            let re = RegExp(`${filter}.*`)
                            if (re.test(key)) return true
                            return false
                          }).map( key => {
                            return (
                              <ListItem className={classes.noGutters}>
                                <Typography>
                                  <label className={classes.emph}>{key}: </label>
                                  { JSON.stringify(conn.attributes[key])}
                                </Typography>
                              </ListItem>
                            )
                          }) || []
                        }
                      </List>
                    </Collapse>
                  </List>
                ))) || <Typography>Not Available</Typography>
                }
              </Collapse>
            </List>
          )))
        }
        else if ( key === 'electricalConnections') {
        }
        else {
          fields.push((
            <div key={`${id}_attribute ${key}`}>
              <Typography>
                <label className={classes.emph}>{key}: </label>
                {asset[key]}
              </Typography>
            </div>
          ))
        }
      }
    }
    return fields
  }
  */

  return (
    <List
      disablePadding
    >
      <ListItem
        disableGutters
      >
        <Tooltip title={assetTypeName} placement='left'>
          <ListItemIcon>
            <AssetTypeSvgIcon
              assetTypeCode={assetTypeCode}
            />
          </ListItemIcon>
        </Tooltip>

        {assetNameComponent}
      </ListItem>
      <Collapse
        in={isWithExpandedDetails}
        // timeout='auto'
      >
      </Collapse>
    </List>
  )
}

/*
    {/*
        <ListItem
          onClick={_handleDetailsExpand}>
          <ListItemText
            primaryTypographyProps={{ className: classes.title }} />
          {detailsExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          // unmountOnExit
        >
          { getFields() }
        </Collapse>

      <Divider />

      <VendorName
        typeId={typeId}
        vendorName={vendorName}
        trackChanges={_trackChanges}
      // saveChanges={_saveChanges}
      />
      <ProductName
        className={clsx({
          
        })}
        type={typeId}
        vendorName={vendorName}
        productName={productName}
        trackChanges={_trackChanges}
      // saveChanges={_saveChanges}
      />
      <ProductVersion
        typeId={typeId}
        vendorName={vendorName}
        productName={productName}
        productVersion={productVersion}
        trackChanges={_trackChanges}
      // saveChanges={_saveChanges}
      />
    </>
*/

function EmptyDetailsPanel() {
  return (
    <Typography>
      Select an asset to see its details
    </Typography>
  )
}
