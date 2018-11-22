import React from 'react'
import PropTypes from 'prop-types'
import { Modal as AntModal } from 'antd'

const defaultProps = {
  okText: 'Confirm',
  cancelText: 'Cancel',
  visible: false,
}

const Modal = ({
  title,
  visible,
  children,
  onOk,
  onCancel,
  okText,
  cancelText,
}) => (
  <AntModal
    title={title}
    centered
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={okText}
    cancelText={cancelText}
  >
    {children}
  </AntModal>
)

Modal.defaultProps = defaultProps

export { Modal }
