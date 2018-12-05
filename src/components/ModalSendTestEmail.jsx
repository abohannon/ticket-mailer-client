import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { Modal } from 'components/common'
import { hideModal } from 'actions/modalActions'

class ModalSendTestEmail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
    selectedOrders: PropTypes.array,
    handleEmail: PropTypes.func,
  }

  componentDidMount() {
    const cachedEmail = localStorage.getItem('tm_test_email')

    if (cachedEmail) {
      this.setState({ value: cachedEmail })
    }
  }

  state = {
    value: '',
  }

  onChange = ({ target }) => {
    const { value } = target
    this.setState({ value })
    localStorage.setItem('tm_test_email', value)
  }

  render() {
    const { value } = this.state
    const {
      dispatch, visible, selectedOrders, handleEmail,
    } = this.props

    return (
      <Modal
        title="Send a test ticket email"
        visible={visible}
        okText="Send"
        onOk={() => handleEmail({ testEmail: value }, hideModal)}
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
