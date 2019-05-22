import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import NotAuthenticatedWindow from './NotAuthenticatedWindow'
import NotAuthorizedWindow from './NotAuthorizedWindow'


class ProtectedRoute extends PureComponent {

  render() {
    const {
      isUserAuthenticated,
      isUserAuthorized,
      component,
      ...props
    } = this.props
    return (
      <Route {...props} component={
        isUserAuthenticated ? (
          isUserAuthorized === undefined || isUserAuthorized ?
          component :
          NotAuthorizedWindow
        ) : NotAuthenticatedWindow
      } />
    )
  }

}


export default ProtectedRoute
