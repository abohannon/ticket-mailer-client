import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button, Menu, Dropdown, Icon,
} from 'antd'
import { BOX_SHADOW } from 'constants'

// Components
import { SearchInput } from 'components/common'

const StyledIcon = styled(Icon)`
  margin-right: 1rem; 
  font-size: 1.5rem;
`

const HeaderMenu = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/dashboard/settings/user">
          <StyledIcon type="setting" />
          Settings
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => props.handleLogout()}>
        <StyledIcon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      {props.children}
    </Dropdown>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  top: 0;
`

const UserDisplay = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`

const Greeting = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 2rem;
`

const StyledButton = styled(Button)`
  box-shadow: ${BOX_SHADOW};
`

const propTypes = {
  showSearchBar: PropTypes.bool,
  currentUser: PropTypes.object,
  handleSearch: PropTypes.func,
}

const Header = (props) => {
  const { showSearchBar, currentUser, handleSearch } = props
  return (
    <Wrapper>
      <SearchInput show={showSearchBar} onSearch={handleSearch} />
      <UserDisplay>
        <Greeting>{`Welcome back, ${currentUser.name}!`}</Greeting>
        <HeaderMenu {...props}>
          <StyledButton shape="circle" icon="user" size="default" />
        </HeaderMenu>
      </UserDisplay>
    </Wrapper>
  )
}

Header.propTypes = propTypes

export default Header
