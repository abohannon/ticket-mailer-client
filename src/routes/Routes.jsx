import React, { Component } from 'react'
import { Switch } from 'react-router-dom'

import RouteHandler from './RouteHandler'

import staticRoutes from './staticRoutes'

class Routes extends Component {
  render() {
    return (
      <Switch>
        {staticRoutes.map((route, i) => <RouteHandler key={i} {...route} />)}
      </Switch>
    )
  }
}

export default Routes
