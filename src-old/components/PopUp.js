import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default function PopUp({ info }) {
  const { x, y, text } = info
  return (
    <Paper
      className='tooltip'
      style={{ left: x, top: y }}
      variant='outlined'
    >
      <Typography
        align='center'
        // noWrap
      >
        {text}
      </Typography>
    </Paper>
  )
}
