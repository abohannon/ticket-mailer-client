import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import styled from 'styled-components'
import RouteHandler from 'routes/RouteHandler'

// Components
import SideNav from 'components/SideNav'
import Header from 'components/Header'
import { Spacer } from 'components/common'

// Actions
import { logoutUser } from 'actions/authenticationActions'
import { search } from 'actions/applicationActions'

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 134rem;
  padding: 0 4rem 0 4rem;
  box-sizing: border-box;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-width: 76rem;
  max-width: 108rem;
  width: 100%;
  padding-top: 2rem;
`

class Dashboard extends Component {
  static propTypes = {
    routes: PropTypes.array,
    history: PropTypes.object,
    authentication: PropTypes.object,
    dispatch: PropTypes.func,
  }

  state = {
    showSearchBar: false,
    searchType: '',
  }

  componentDidMount() {
    const { history } = this.props
    if (history.location.pathname === '/dashboard') {
      history.replace('/dashboard/tours', { from: '/dashboard' })
    }
  }

  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  toggleSearchBar = (searchType) => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
      searchType,
    }))
  }

  handleSearch = (value) => {
    const { searchType } = this.state
    const { dispatch } = this.props

    dispatch(search(searchType, value))
  }

  render() {
    const { showSearchBar } = this.state

    const {
      authentication: { currentUser }, routes,
    } = this.props

    return (
      <Wrapper className="wrapper-dashboard">
        <SideNav />
        <Main>
          <Header
            currentUser={currentUser}
            showSearchBar={showSearchBar}
            handleLogout={this.handleLogout}
            handleSearch={this.handleSearch}
          />
          <Spacer />
          <Switch>
            {routes.map((route, i) => (
              <RouteHandler
                key={`dashboard-${i}`}
                toggleSearchBar={this.toggleSearchBar}
                {...route}
              />
            ))}
          </Switch>
        </Main>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication })

export default connect(mapStateToProps)(Dashboard)
