import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'antd'
import { BOX_SHADOW } from 'constants'

const { Search } = Input

const StyledSearch = styled(Search)`
  width: ${props => props.style.width || '300px'};
  box-shadow: ${BOX_SHADOW};
  border-radius: 4px;
`

const propTypes = {
  show: PropTypes.bool,
  style: PropTypes.object,
  onSearch: PropTypes.func,
}

const defaultProps = {
  show: false,
  style: {},
}

export const SearchInput = (props) => {
  const { show, style, onSearch } = props

  if (!show) return null

  return (
    <StyledSearch
      placeholder="Search"
      onSearch={value => onSearch(value)}
      style={style}
      enterButton
    />
  )
}

SearchInput.propTypes = propTypes
SearchInput.defaultProps = defaultProps
