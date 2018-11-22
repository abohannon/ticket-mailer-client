import React, { Component } from 'react'
import { Input } from 'antd'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'
import { inviteUser } from 'actions/userActions'

class ModalInviteUser extends Component {
  state = {
    value: '',
  }

  onChange = ({ target }) => {
    const { value } = target
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const { dispatch, visible } = this.props

    return (
      <Modal
        title="Send invite to new team member"
        visible={visible}
        onOk={() => dispatch(inviteUser(value)).then(dispatch(hideModal()))}
        onCancel={() => dispatch(hideModal())}
      >
        <p>Enter the email address of the user you want to invite.</p>
        <Input placeholder="Email" value={value} onChange={this.onChange} />
      </Modal>
    )
  }
}

export default ModalInviteUser
