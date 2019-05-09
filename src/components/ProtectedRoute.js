import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { appaAuthClient } from 'appa-auth-client'
import NotAuthenticatedWindow from './NotAuthenticatedWindow'

class ProtectedRoute extends PureComponent {
  render() {
    const {
      render,
      ...etc
    } = this.props
    return (
      <Route {...etc} render={() => (
        appaAuthClient.isAuthenticated() ?
        render() :
        <NotAuthenticatedWindow />
      )} />
    )
  }
}

export default ProtectedRoute
