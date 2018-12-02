import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { CARD_TITLE_PRIMARY } from 'constants'
import { Button, message } from 'antd'

import { Card } from 'components/common'
import OrdersList from 'components/OrdersList'
import EmailForm from 'components/EmailForm'

// Actions
import { fetchOrders, search } from 'actions/applicationActions'
import { fetchEmail, saveEmail, sendEmail } from 'actions/emailActions'
import { showModal } from 'actions/modalActions'

import {
  SEARCH_ORDERS, CLEAR_SEARCH, CONFIRM_SEND_EMAIL, SEND_TEST_EMAIL,
} from 'actions/types'

class Orders extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    location: PropTypes.object,
    fetchEmailResolved: PropTypes.object,
    fetchOrdersPending: PropTypes.object,
    fetchOrdersResolved: PropTypes.object,
    saveEmailResolved: PropTypes.object,
    saveEmailRejected: PropTypes.object,
    toggleSearchBar: PropTypes.func,
    searchResultsOrders: PropTypes.array,
    sendEmailPending: PropTypes.object,
    sendEmailResolved: PropTypes.object,
    sendEmailRejected: PropTypes.object,
  }

  state = {
    activeTab: 'orders',
    selectedOrders: [],
    selectedRowKeys: [],
    message: '',
  }

  componentDidMount() {
    const { dispatch, location, toggleSearchBar } = this.props
    const searchQuery = location.search

    toggleSearchBar(SEARCH_ORDERS)

    dispatch(search(CLEAR_SEARCH))
    dispatch(fetchOrders(searchQuery))
    dispatch(fetchEmail(searchQuery))
  }

  componentDidUpdate(prevProps) {
    const { sendEmailPending, sendEmailResolved, sendEmailRejected } = this.props

    if (!isEmpty(prevProps.sendEmailPending) && isEmpty(sendEmailPending)) {
      if (!isEmpty(sendEmailResolved)) {
        message.success('Email(s) successfully sent!', 5)
      }

      if (!isEmpty(sendEmailRejected)) {
        message.warning('There was a problem sending the email(s).', 5)
        console.log('%c Email send error: ', sendEmailRejected.payload.message, 'background: #222; color: #bada55')
      }
    }
  }

  componentWillUnmount() {
    const { toggleSearchBar } = this.props

    toggleSearchBar()
  }

  onTabChange = (key) => {
    this.setState({ activeTab: key })
  }

  saveEmailContent = async (data) => {
    const { dispatch, location } = this.props
    const searchQuery = location.search

    const mergedData = {
      ...data,
      variant_id: location.state.variantId,
      searchQuery,
    }

    await dispatch(saveEmail(mergedData))
    dispatch(fetchEmail(searchQuery))
  }

  updateSelectedOrders = (selectedOrders, selectedRowKeys) => {
    this.setState({
      selectedOrders,
      selectedRowKeys,
    })
  }

  handleEmail = (callback) => {
    const { fetchEmailResolved, location, dispatch } = this.props
    const { selectedOrders } = this.state

    const { artistName, showTitle, variantTitle } = location.state

    if (fetchEmailResolved.payload.error) {
      this.setState({ message: 'You haven\'t saved an email yet.' })
      return console.log('You haven\'t saved an email yet.')
    }

    const emailData = {
      content: fetchEmailResolved.payload,
      orders: selectedOrders,
      artistName,
      showTitle,
      variantTitle,
    }

    dispatch(sendEmail(emailData))
      .then(dispatch(callback()))
  }

  handleTestEmail = (email, callback) => {
    console.log(email)

    this.props.dispatch(callback())
  }

  render() {
    const {
      fetchOrdersPending,
      fetchOrdersResolved,
      fetchEmailResolved,
      saveEmailResolved,
      saveEmailRejected,
      searchResultsOrders,
      dispatch,
    } = this.props

    const { selectedOrders } = this.state

    const tabList = [{
      key: 'orders',
      tab: 'List',
    },
    {
      key: 'email',
      tab: 'Edit email',
    },
    ]

    const orders = !isEmpty(searchResultsOrders) ? searchResultsOrders : fetchOrdersResolved.payload
    const email = fetchEmailResolved.payload
    const loading = !isEmpty(fetchOrdersPending)
    const emailSaved = !isEmpty(saveEmailResolved)
    const emailSaveError = !isEmpty(saveEmailRejected)
    const disabled = this.state.selectedOrders.length < 1

    const sendEmailModalProps = {
      selectedOrders,
      handleEmail: this.handleEmail,
    }

    const testEmailModalProps = {
      selectedOrders,
      handleTestEmail: this.handleTestEmail,
    }

    const sendEmailButton = (
      <div>
        <Button
          type="primary"
          disabled={disabled}
          onClick={() => dispatch(showModal(CONFIRM_SEND_EMAIL, sendEmailModalProps))}
        >
          Send email
        </Button>
        <Button
          type="secondary"
          disabled={disabled}
          onClick={() => dispatch(showModal(SEND_TEST_EMAIL, testEmailModalProps))}
          style={{ marginLeft: '1rem' }}
        >
          Send test
        </Button>
      </div>
    )

    const tabListContent = {
      orders: (
        <OrdersList
          orders={orders || []}
          loading={loading}
          onUpdate={this.updateSelectedOrders}
          selectedRowKeys={this.state.selectedRowKeys}
        />
      ),
      email: (
        <EmailForm
          email={email}
          onSave={this.saveEmailContent}
          saveSuccess={emailSaved}
          saveError={emailSaveError}
        />
      ),
    }

    return (
      <Fragment>
        <Card
          title="Orders"
          headStyle={CARD_TITLE_PRIMARY}
          tabList={tabList}
          activeTabKey={this.state.activeTab}
          onTabChange={key => this.onTabChange(key)}
          fullWidth={this.state.activeTab === 'orders'}
          extra={this.state.activeTab === 'orders' && sendEmailButton}
        >
          {tabListContent[this.state.activeTab]}
        </Card>
      </Fragment>
    )
  }
}

const mapStateToProps = ({
  application: {
    fetchOrdersResolved,
    fetchOrdersPending,
    fetchOrdersRejected,
    searchResultsOrders,
  },
  email: {
    fetchEmailResolved,
    saveEmailResolved,
    saveEmailRejected,
    sendEmailPending,
    sendEmailResolved,
    sendEmailRejected,
  },
}) => ({
  fetchOrdersResolved,
  fetchOrdersPending,
  fetchOrdersRejected,
  fetchEmailResolved,
  saveEmailResolved,
  saveEmailRejected,
  searchResultsOrders,
  sendEmailPending,
  sendEmailResolved,
  sendEmailRejected,
})

export default connect(mapStateToProps)(Orders)
