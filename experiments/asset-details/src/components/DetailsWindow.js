import React from 'react'
import produce from 'immer'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CloseButton from './CloseButton'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import EditIcon from '@material-ui/icons/Edit';
import {TextField} from "@material-ui/core";
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(8),
    // bottom: theme.spacing(5),
    right: theme.spacing(1),
    width: theme.spacing(35),
    padding: theme.spacing(1),
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
    width: '100%'
  }, 
  input: {
    width: '100%'
  },
  mimic: {
    border: 'none',
    boxShadow: 'none',
  },
  noPadding: {
    padding: 0
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  noGutters: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  icon: {
    fontSize: '3.6em',
  },
  iconInner: {
    fontSize: '1.6em',
  },
  title: {
    fontSize: '1.6em'
  },
  connection: {
    fontWeight: 'bold'
  },
  emph: {
    fontStyle: 'italic',
    fontWeight: 400,
  }
}))

function DetailsWindow(props) {
  const classes = useStyles()
  const {
    geoJson,
    setGeoJson,
    selectedFeatureIndexes,
    setSelectedFeatureIndexes,
    setFocusingAssetId,
    isWithDetails,
    focusingAsset,
    assetById,
    setIsWithDetails,
    setAssetById,
  } = props

  const _onChange = (e) => {
    const field = e.target.name
    const input = e.target.value
    const assetId = focusingAsset.id
    setAssetById(
      produce( draft => {
        draft[assetId][field] = input
      })
    )
  }

  const [assetOpen, setAssetOpen] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [buses, setBusesOpen] = React.useState({});
  const [connections, setConnectionOpen] = React.useState({})
  const [filter, setFilter] = React.useState('');

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const handleAssetClick = () => {
    setAssetOpen(!assetOpen);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleBusesClick = (bus) => {
    console.log(JSON.stringify({...buses, bus: !buses[bus]}))
      setBusesOpen({...buses, [bus]: !buses[bus]})
  };


  const handleConnectionsClick = (conn) => {
    console.log(JSON.stringify({...connections, [conn]: !connections[conn]}))
    setConnectionOpen({...connections, [conn]: !connections[conn]})
  };

  const getFields = () => {
    const fields = []
    console.log(focusingAsset)
    for (let key in focusingAsset) {
      if (focusingAsset.hasOwnProperty(key)){
        if (key === 'attributes') {
          fields.push(Object.keys(focusingAsset.attributes).map((key) => <div key={focusingAsset.id + "_attribute " + key}>
            <Typography><label className={classes.emph}>{key}: </label> {focusingAsset.attributes[key]}</Typography>
          </div>))
        } else if (key === 'busByIndex') {
          fields.push(Object.keys(focusingAsset.busByIndex).map((key) =>
              <List component="nav">
              <ListItem className={classes.noGutters} button onClick={() => handleBusesClick(key)}>
                <ListItemText primaryTypographyProps={{className:classes.title}} primary={"Bus " + key} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={buses[key]} timeout="auto" unmountOnExit>
                { focusingAsset.electricalConnections.filter(conn => conn.bus_id == key).map((conn, index) =>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.noGutters}  onClick={() => handleConnectionsClick(key + index)}>
                        <InboxIcon className={classes.iconInner} />
                      <ListItemText primaryTypographyProps={{className:classes.connection}} primary={"Connected " + conn.asset_id} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={connections[key + index]} timeout="auto" unmountOnExit>
                      <List component="div">
                        {
                          Object.keys(conn.attributes).filter((key) => {
                            if (filter === '') return true;
                            let re = RegExp(`${filter}.*`)
                            if (re.test(key)) return true;
                            return false;
                          }).map((key) => {
                            return <ListItem className={classes.noGutters}>
                              <Typography><label className={classes.emph}>{key}: </label> {JSON.stringify(conn.attributes[key])}</Typography>
                            </ListItem>
                          }) || []
                        }
                      </List>
                    </Collapse>
                  </List>
                )}
              </Collapse>
            </List>
              )
          )
        } else if (key === 'electricalConnections') {

        } else {
          fields.push( <div key={focusingAsset.id + "_attribute " + key}>
            <Typography><label className={classes.emph}>{key}: </label> {focusingAsset[key]}</Typography>
          </div>)
        }
      }
    }
    return fields
  }

  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isWithDetails,
      })}
    >
      <CloseButton onClick={() => setIsWithDetails(false)} />
    {focusingAsset ? 
      <>
        {/* <Typography>{focusingAsset.type}</Typography> */}

        <List component="nav">
          <ListItem button className={classes.noGutters} onClick={handleAssetClick}>
            <StarBorder className={classes.icon} />
            <ListItemText primaryTypographyProps={{className:classes.title}} primary={focusingAsset.name}  secondary={<>
              <Typography><Link><EditIcon fontSize='small' /> Edit</Link></Typography>
            </>}/>
            {assetOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={assetOpen} timeout="auto" unmountOnExit>
          {
            getFields()
          }
          </Collapse>
        </List>

        <Divider />

        <TextField className={classes.input} id="filter" type="text" label='Filter connection attributes' onChange={handleFilter}/>
      </>
      : 
      <Typography>
        Select an asset to see details
      </Typography>
    }
    </Paper>
  )
}

export default DetailsWindow
