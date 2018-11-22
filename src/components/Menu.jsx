import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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

const InnerContent = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.active ? LIGHT_BLUE : DARK_BLUE)};
  font-weight: ${props => (props.active ? 500 : null)};
`

/* Start MenuItem Component */
const propTypes = {
  children: PropTypes.array,
  index: PropTypes.number,
  updateActiveIndex: PropTypes.func,
  style: PropTypes.object,
  path: PropTypes.string,
  activeIndex: PropTypes.number,
  onClick: PropTypes.func,
}

const handleClick = (updateIndex, index, onClick) => {
  if (onClick) onClick()
  updateIndex(index)
}

const MenuItem = (props) => {
  const {
    children,
    style,
    path,
    index,
    activeIndex,
    onClick,
    updateActiveIndex,
  } = props

  const active = activeIndex === index

  return (
    <ListItem
      style={{ ...style }}
      onClick={() => handleClick(updateActiveIndex, index, onClick)}
    >
      <Link to={path} style={{ textDecoration: 'none' }}>
        <InnerContent active={active}>
          {children}
        </InnerContent>
      </Link>
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

  state = {
    activeIndex: 0,
  }

  updateActiveIndex = (index) => {
    console.log(index)
    this.setState({ activeIndex: index })
  }

  render() {
    const { children, style } = this.props

    const childProps = {
      activeIndex: this.state.activeIndex,
      updateActiveIndex: this.updateActiveIndex,
    }

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
