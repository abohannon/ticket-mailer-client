import React from 'react'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

const ModalDeleteUser = (props) => {
  const { dispatch, visible } = props
  return (
    <Modal
      title="Delete user"
      visible={visible}
      onOk={() => dispatch(hideModal())}
      onCancel={() => dispatch(hideModal())}
    >
      <p>Are you sure you want to delete this user from Ticket Mailer?</p>
    </Modal>
  )
}

export default ModalDeleteUser
