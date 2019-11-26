import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'


function Details(props) {

  const { nodeDetails } = props
  if ( nodeDetails ) console.log(nodeDetails !== undefined)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label='Key'
          value= { nodeDetails !== undefined ? nodeDetails.get('key'): ''}
          margin="normal" /> 
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Text'
          value={ nodeDetails !== undefined ? nodeDetails.get('text') : ''}
          margin="normal" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Location"
          value={ nodeDetails !== undefined ? nodeDetails.get('loc') : ''}
          margin="normal" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Type"
          value={ nodeDetails !== undefined ? nodeDetails.get('type') : ''}
          margin="normal" />
      </Grid>
    </Grid>
  )
}

export default Details
