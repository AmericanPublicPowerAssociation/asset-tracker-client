import React from 'react'
import produce from 'immer'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField';
import CloseButton from './CloseButton'
import DeleteButton from './DeleteButton'

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
      {focusingAsset.electricalConnections &&
      <div className={classes.section}>
          <Typography><i>Electrical Connections</i></Typography>

        {Object.keys(focusingAsset.electricalConnections).map(k => {
          const connectedAsset = assetById[k]
          return (
            <Card className={classes.card}>
              {connectedAsset.name}
            </Card>
          )
        }
        )}
      </div>
      }
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
