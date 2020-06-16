import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default function PopUp({ info }) {
  const { x, y, text } = info
  return (
    <Paper
      className='tooltip'
      variant='outlined'
      style={{ left: x, top: y }}
    >
      <Typography align='center' >
        {text}
      </Typography>
    </Paper>
  )
}
