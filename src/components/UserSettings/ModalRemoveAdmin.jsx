import React from 'react'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

const ModalRemoveAdmin = (props) => {
  const { dispatch, visible } = props
  return (
    <Modal
      title="Remove Admin"
      visible={visible}
      onOk={() => dispatch(hideModal())}
      onCancel={() => dispatch(hideModal())}
    >
      <p>Are you sure you want to remove this user's admin privileges?</p>
    </Modal>
  )
}

export default ModalRemoveAdmin
