import React from 'react'
import { connect } from 'react-redux'
import {
  MAKE_ADMIN,
  REMOVE_ADMIN,
  DELETE_USER,
  INVITE_USER,
  CONFIRM_SEND_EMAIL,
  SEND_TEST_EMAIL,
} from 'actions/types'

// Modal Components
import ModalRemoveAdmin from 'components/UserSettings/ModalRemoveAdmin'
import ModalInviteUser from 'components/UserSettings/ModalInviteUser'
import ModalMakeAdmin from 'components/UserSettings/ModalMakeAdmin'
import ModalDeleteUser from 'components/UserSettings/ModalDeleteUser'
import ModalConfirmSendEmail from 'components/ModalConfirmSendEmail'
import ModalSendTestEmail from 'components/ModalSendTestEmail'

const MODAL_COMPONENTS = {
  [MAKE_ADMIN]: ModalMakeAdmin,
  [REMOVE_ADMIN]: ModalRemoveAdmin,
  [DELETE_USER]: ModalDeleteUser,
  [INVITE_USER]: ModalInviteUser,
  [CONFIRM_SEND_EMAIL]: ModalConfirmSendEmail,
  [SEND_TEST_EMAIL]: ModalSendTestEmail,
}

const ModalRoot = (props) => {
  const { dispatch, modal: { modalType, modalOpen, modalProps } } = props

  if (!modalType) return null

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return (
    <SpecificModal
      visible={modalOpen}
      dispatch={dispatch}
      {...modalProps}
    />
  )
}

const mapStateToProps = ({ modal }) => ({ modal })

export default connect(mapStateToProps)(ModalRoot)
