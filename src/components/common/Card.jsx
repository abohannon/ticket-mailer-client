import React from 'react'
import { Card as AntCard } from 'antd'
import { BOX_SHADOW } from 'constants'


export const Card = (props) => {
  const {
    style,
    bodyStyle,
    headStyle,
    children,
    fullWidth,
    ...rest
  } = props

  const cardProps = {
    style: { boxShadow: BOX_SHADOW, ...style },
    bodyStyle: {
      padding: fullWidth && '1px 0px',
      marginBottom: '1.5rem',
      ...bodyStyle,
    },
    headStyle: {
      padding: '0px 16px',
      ...headStyle,
    },
    ...rest,
  }

  return (
    <AntCard {...cardProps}>
      {children}
    </AntCard>
  )
}
