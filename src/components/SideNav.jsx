import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

// Components
import { Menu, MenuItem } from 'components/Menu'
import { Spacer } from 'components/common'

// Styles
const Wrapper = styled.nav`
  min-width: 26rem;
  padding: 2rem 2rem 2rem 0;
  font-size: 1.4rem;
`

const StyledIcon = styled(Icon)`
  margin-right: 1rem; 
  font-size: 1.8rem;
`

const Header = styled.div`
  display: flex;
`

const Title = styled.h3`
  text-transform: uppercase;
  letter-spacing: .2rem;
  margin: 0;
`

class Sidebar extends Component {
  render() {
    return (
      <Wrapper className="side-nav">
        <Header>
          <Title>Ticket Mailer</Title>
        </Header>
        <Spacer />
        <Menu>
          <MenuItem path="/dashboard/tours">
            <StyledIcon type="profile" />
            Tours
          </MenuItem>
          <MenuItem path="/dashboard/shows/all">
            <StyledIcon type="environment-o" />
            Shows
          </MenuItem>
          <Spacer />
        </Menu>
      </Wrapper>
    )
  }
}

export default Sidebar
