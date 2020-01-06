import React from 'react'
import produce from 'immer'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseButton from './CloseButton'
import DeleteButton from './DeleteButton'
import {ExpansionPanel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(8),
    // bottom: theme.spacing(5),
    right: theme.spacing(1),
    width: theme.spacing(30),
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

  const getFields = () => {
    const fields = []
    for (let key in focusingAsset) {
      if (focusingAsset.hasOwnProperty(key)){
        if (key == 'attributes') {
          fields.push(
            <ExpansionPanel className={classes.mimic}>
              <ExpansionPanelSummary
                className={classes.noPadding}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>Attributes</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.vertical}>
                {
                  Object.keys(focusingAsset.attributes).map((key) => <TextField
                    className={classes.input}
                    name={key}
                    key={focusingAsset.id + "_attribute " + key}
                    label={key}
                    value={focusingAsset.attributes[key]}
                    disabled={key === 'id' || key === 'type'}
                  />)
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
            )
        } else if (key == 'busByIndex') {
          fields.push(
            <ExpansionPanel className={classes.mimic}>
              <ExpansionPanelSummary
                className={classes.noPadding}
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel-buses-content'
                id='panel-buses-header'>
                <Typography>Buses</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.vertical}>
              { Object.keys(focusingAsset.busByIndex).map((key) => <>
                  <ExpansionPanel className={classes.mimic}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${key}-content`}
                      id={`panel${key}-header`}>
                      <Typography>Bus {key}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.vertical}>
                      {
                        Object.keys(focusingAsset.busByIndex[key].attributes).map((key) => <TextField
                          className={classes.input}
                          name={key}
                          key={focusingAsset.id + "_attribute " + key}
                          label={key}
                          value={focusingAsset.attributes[key]}
                          disabled={key === 'id' || key === 'type'}
                        />) || []
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </>
              )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        } else if (key == 'electricalConnections') {
          fields.push(
            <ExpansionPanel className={classes.mimic}>
              <ExpansionPanelSummary
                className={classes.noPadding}
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel-buses-content'
                id='panel-buses-header'>
                <Typography>Electrical Connections</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.vertical}>
                { focusingAsset.electricalConnections.map((conn) => <>
                    <ExpansionPanel className={classes.mimic}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${conn.asset_id + conn.bus_id}-content`}
                        id={`panel${conn.asset_id + conn.bus_id}-header`}>
                        <Typography>Element {conn.asset_id} - Bus {conn.bus_id}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.vertical}>
                        {
                          Object.keys(conn.attributes).map((key) => <TextField
                            className={classes.input}
                            name={key}
                            key={focusingAsset.id + "_attribute " + key}
                            label={key}
                            value={JSON.stringify(conn.attributes[key])}
                            disabled={key === 'id' || key === 'type'}
                          />) || []
                        }
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        } else {
          fields.push(
            <TextField
              className={classes.input}
              name={key}
              key={focusingAsset.id + "_" + key}
              label={key}
              value={focusingAsset[key]}
              disabled={key === 'id' || key === 'type'}
              onChange={ _onChange }
            />
          )
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
        <Typography>{focusingAsset.name}</Typography>
        {/* <Typography>{focusingAsset.type}</Typography> */}
      
      <form noValidate autoComplete="off" className={classes.form}>
        {
          getFields()
        }
      </form>

      <DeleteButton
        setFocusingAssetId={setFocusingAssetId}
        setSelectedFeatureIndexes={setSelectedFeatureIndexes}
        geoJson={geoJson}
        setGeoJson={setGeoJson}
        selectedFeatureIndexes={selectedFeatureIndexes}
        focusingAsset={focusingAsset}i
        setAssetById={setAssetById}
      />
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
