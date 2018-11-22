import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (route) => {
  const { routes, ...rest } = route

  return (
    <Route
      path={route.path}
      render={props => (route.isAuthenticated
        ? <route.component {...props} {...rest} routes={route.routes} />
        : (
          <Redirect
            to={{
              pathname: route.redirect ? props.match.url.replace(route.redirect.from, route.redirect.to) : '/',
              state: { from: props.location },
            }}
          />
        ))
      }
    />
  )
}

const RouteHandler = route => (route.protected
  ? <PrivateRoute {...route} />
  : (
    <Route
      path={route.path}
      render={props => <route.component {...props} {...route} routes={route.routes} />}
    />
  ))

const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated,
})

export default connect(mapStateToProps)(RouteHandler)
