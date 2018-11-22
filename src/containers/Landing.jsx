import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import { AUTH_USER } from 'actions/types'
import {
  ENV, DEV, BLUE, LIGHT_BLUE,
} from 'constants'

// Components
import Login from 'components/Login'
import Signup from 'components/Signup'

// Actions
import {
  loginUser,
  authenticateUser,
  signupUser,
  verifyToken,
} from 'actions/authenticationActions'

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  background: ${BLUE};
  background: linear-gradient(142deg, ${BLUE} 0%, ${LIGHT_BLUE} 100%);
`

export class Landing extends Component {
  static propTypes = {
    authentication: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const {
      authentication: { isAuthenticated },
      history,
      dispatch,
      location,
      path,
    } = this.props

    if (isAuthenticated) {
      history.push('/dashboard')
    }

    const token = localStorage.getItem('id_token')

    if (token && !isAuthenticated) {
      dispatch(authenticateUser(token))
    }

    if (path === '/signup') {
      dispatch(verifyToken(location.search))
    }
  }

  componentDidUpdate(prevProps) {
    const {
      authentication: {
        isAuthenticated,
        verifyTokenPending,
        verifyTokenResolved,
        verifyTokenRejected,
      },
      history,
    } = this.props

    if (!prevProps.isAuthenticated && isAuthenticated) {
      history.push('/dashboard')
    }

    // if verifyToken is no longer pending...
    if (!isEmpty(prevProps.authentication.verifyTokenPending) && isEmpty(verifyTokenPending)) {
      // ...and if the token comes back rejected (i.e. doesn't exist), redirect user to
      // landing page to keep signup page invite only.
      if (!isEmpty(verifyTokenRejected) && isEmpty(verifyTokenResolved)) {
        history.push('/')
      }
    }
  }

  render() {
    console.log(process.env.NODE_ENV)
    const { dispatch, authentication } = this.props

    if (authentication && !isEmpty(authentication.pending)
      && authentication.pending.type === AUTH_USER) {
      return null
    }

    return (
      <Wrapper className="wrapper-landing">
        <Switch>
          <Route
            exact
            path="/"
            component={() => (<Login handleLogin={loginData => dispatch(loginUser(loginData))} />)}
          />
          <Route
            path="/signup"
            component={() => (
              <Signup
                handleSignup={userData => dispatch(signupUser(userData))}
                {...authentication}
              />
            )}
          />
        </Switch>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication })

export default connect(mapStateToProps)(Landing)
