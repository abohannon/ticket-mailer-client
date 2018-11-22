import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  style: PropTypes.object,
}

export const Spacer = ({ style }) => (
  <div style={{ height: '2rem', ...style }} />
)

Spacer.propTypes = propTypes
