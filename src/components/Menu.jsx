import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { DARK_BLUE, LIGHT_BLUE } from 'constants'

const Wrapper = styled.nav`
  min-width: 26rem;
`

const UnorderedList = styled.ul`
  list-style: none;
`

const ListItem = styled.li`
  margin-bottom: 1.5rem;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${DARK_BLUE};
  textDecoration: none;
  font-weight: 200;
`

/* Start MenuItem Component */
const propTypes = {
  children: PropTypes.array,
  style: PropTypes.object,
  path: PropTypes.string,
}

const MenuItem = (props) => {
  const {
    children,
    style,
    path,
  } = props

  return (
    <ListItem style={{ ...style }}>
      <StyledNavLink
        to={path}
        activeStyle={{ color: LIGHT_BLUE, fontWeight: 500, textDecoration: 'none' }}
      >
        {children}
      </StyledNavLink>
    </ListItem>
  )
}

MenuItem.propTypes = propTypes

/* Start Menu Component */
class Menu extends Component {
  static propTypes = {
    children: PropTypes.array,
    style: PropTypes.object,
  }

  render() {
    const { children, style } = this.props

    const childProps = {}

    // So we can pass props to our children
    const childrenWithProps = React.Children.map(children, child => (
      React.cloneElement(child, childProps)
    ))

    return (
      <Wrapper className="menu__inner-wrapper" style={{ ...style }}>
        <UnorderedList>
          {childrenWithProps}
        </UnorderedList>
      </Wrapper>
    )
  }
}

export { Menu, MenuItem }
