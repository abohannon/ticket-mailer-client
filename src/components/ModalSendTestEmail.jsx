import React, { Component } from 'react'
import { Input } from 'antd'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

class ModalSendTestEmail extends Component {
  state = {
    value: '',
  }

  onChange = ({ target }) => {
    const { value } = target
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const {
      dispatch, visible, selectedOrders, handleTestEmail,
    } = this.props

    return (
      <Modal
        title="Send a test ticket email"
        visible={visible}
        okText="Send"
        onOk={() => handleTestEmail(value, hideModal)}
        onCancel={() => dispatch(hideModal())}
      >
        <p>Send test email to:</p>
        <Input placeholder="Email" value={value} onChange={this.onChange} />
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>*Email will be a preview of  <strong>{selectedOrders[0].email}</strong>'s ticket email.</p>
      </Modal>
    )
  }
}

export default ModalSendTestEmail
