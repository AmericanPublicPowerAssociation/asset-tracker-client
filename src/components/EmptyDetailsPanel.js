// TODO: Review from scratch

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  gutterBottom: {
    marginBottom: '1rem',
  },
}))


export default function EmptyDetailsPanel() {
  const classes = useStyles()

  return (<div style={{ margin: '25px 30px 25px 30px' }}>
    <Typography
      gutterBottom
      classes={{ gutterBottom: classes.gutterBottom }}
      variant='h6'
      style={{ fontWeight: 'bold', fontSize: '1.3rem' }}
    >
      No Asset Selected
    </Typography>
    <Typography>
      Select an asset to see its details.
    </Typography>
    </div>
  )
}
