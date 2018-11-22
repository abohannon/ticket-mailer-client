import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

// Components
import Routes from 'routes/Routes'
import ModalRoot from 'containers/ModalRoot'

class AppContainer extends Component {
  render() {
    return (
      <div className="app-container">
        <Routes />
        <ModalRoot />
      </div>
    )
  }
}

export default hot(module)(AppContainer)
