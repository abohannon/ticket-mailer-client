import React from 'react'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

const ModalMakeAdmin = (props) => {
  const { dispatch, visible } = props
  return (
    <Modal
      title="Promote user to admin"
      visible={visible}
      onOk={() => dispatch(hideModal())}
      onCancel={() => dispatch(hideModal())}
    >
      <p>Are you sure you want to promote this user to admin?</p>
    </Modal>
  )
}

export default ModalMakeAdmin
