import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'

import history from 'helpers/history'
import Root from 'Root'
import 'App.css'
import 'styles/antd-styles.css'

import AppContainer from 'containers/AppContainer'

const rootEl = document.getElementById('root')
console.log('NODE_ENV', process.env.NODE_ENV)
console.log(typeof window === 'object')
console.log(typeof process === 'object')

const renderApp = Component => render(
  <Root>
    <Router history={history}>
      <Component />
    </Router>
  </Root>,
  rootEl,
)

renderApp(AppContainer)
