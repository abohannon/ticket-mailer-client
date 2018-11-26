import React from 'react'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

const ModalConfirmSendEmail = (props) => {
  const {
    dispatch, visible, selectedOrders, handleEmail,
  } = props

  const single = selectedOrders.length === 1
  const message = () => {
    if (single) {
      return <p>Are you sure you want to send this email to <strong>{selectedOrders[0].email}</strong>?</p>
    }

    return <p>Are you sure you want to send this email to <strong>{selectedOrders.length}</strong> people?</p>
  }

  return (
    <Modal
      title="Send ticket email"
      visible={visible}
      onOk={() => handleEmail()}
      onCancel={() => dispatch(hideModal())}
    >
      { message() }
    </Modal>
  )
}

export default ModalConfirmSendEmail
