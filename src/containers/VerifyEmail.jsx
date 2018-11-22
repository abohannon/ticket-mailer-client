import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

// Actions
import { verifyEmail, authenticateUser } from 'actions/authenticationActions'

const VerifyMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  padding-top: 4rem;
`

class VerifyEmail extends Component {
  state = {
    message: 'Verifying email...',
  }

  componentDidMount() {
    const { location, history, dispatch } = this.props

    const query = location.search

    if (query === '' || !query.includes('token')) {
      history.replace('/')
    }

    dispatch(verifyEmail(query))
  }

  componentDidUpdate(prevProps) {
    const { authentication, dispatch, history } = this.props

    if (!isEmpty(prevProps.authentication.verifyEmailPending)
    && isEmpty(authentication.verifyEmailPending)) {
      if (!isEmpty(authentication.verifyEmailResolved)) {
        const { message } = authentication.verifyEmailResolved.payload
        this.setState({ message })
      }

      if (!isEmpty(authentication.verifyEmailRejected)) {
        const { message } = authentication.verifyEmailRejected.payload
        this.setState({ message })
      }

      if (!isEmpty(authentication.verifyEmailResolved)) {
        const { message, token } = authentication.verifyEmailResolved.payload

        this.setState({ message }, async () => {
          await dispatch(authenticateUser(token))
          history.push('/dashboard')
        })
      }
    }
  }

  render() {
    const { message } = this.state

    return (
      <VerifyMessage>{ message }</VerifyMessage>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication })

export default connect(mapStateToProps)(VerifyEmail)
