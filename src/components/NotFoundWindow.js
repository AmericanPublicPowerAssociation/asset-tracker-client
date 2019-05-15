import React, { Fragment, PureComponent } from 'react'
import Typography from '@material-ui/core/Typography'

class NotFoundWindow extends PureComponent {
  render = () => {
    return (
      <Fragment>
        <Typography variant='h6' align='center' paragraph>
          Whoops!
        </Typography>
        <Typography align='center' paragraph>
          We could not find the page you requested.
        </Typography>
      </Fragment>
    )
  }
}

export default NotFoundWindow
