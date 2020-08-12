import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default function PopUp({ state }) {
  const { x, y, text } = state
  return (
    <Paper
      className='tooltip'
      variant='outlined'
      style={{ position: 'fixed', left: x, top: y }}
    >
      <Typography align='center' >
        {text}
      </Typography>
    </Paper>
  )
}
