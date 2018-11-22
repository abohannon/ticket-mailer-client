/* This wrapper component is needed for Jest/Enzyme testing to work properly */
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import decode from 'jwt-decode'
import reducers from 'reducers'
import { loadState, saveState } from 'helpers/storage'
import { LOCAL, DEV } from 'constants'

export default ({ children }) => {
  const persistedState = () => {
    const storedState = loadState()

    if (storedState) {
      const { authentication } = storedState
      const token = localStorage.getItem('tm_id_token')
      const decoded = token && decode(token)
      const date = new Date()

      if (token && decoded.exp > date.getTime()) {
        return {
          authentication: { ...authentication, isAuthenticated: true },
        }
      }
    }
  }

  const middlewares = [thunk]

  if (LOCAL || DEV) {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const enhancers = composeEnhancers(applyMiddleware(...middlewares))
  const store = createStore(reducers, persistedState(), enhancers)

  store.subscribe(() => {
    const { authentication } = store.getState()

    saveState({
      authentication: { ...authentication },
    })
  })

  return <Provider store={store}>{children}</Provider>
}
