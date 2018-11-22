import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { CARD_TITLE_PRIMARY } from 'constants'
import { Button } from 'antd'

import { Card } from 'components/common'
import OrdersList from 'components/OrdersList'
import EmailForm from 'components/EmailForm'

// Actions
import { fetchOrders, search } from 'actions/applicationActions'
import { fetchEmail, saveEmail, sendEmail } from 'actions/emailActions'

import { SEARCH_ORDERS, CLEAR_SEARCH } from 'actions/types'

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

  handleEmail = (orders) => {
    const { fetchEmailResolved, location, dispatch } = this.props

    const { artistName, showTitle, variantTitle } = location.state

    if (fetchEmailResolved.payload.error) {
      this.setState({ message: 'You haven\'t saved an email yet.' })
      return console.log('You haven\'t saved an email yet.')
    }

    const emailData = {
      content: fetchEmailResolved.payload,
      orders,
      artistName,
      showTitle,
      variantTitle,
    }

    dispatch(sendEmail(emailData))
  }

  render() {
    const {
      fetchOrdersPending,
      fetchOrdersResolved,
      fetchEmailResolved,
      saveEmailResolved,
      saveEmailRejected,
      searchResultsOrders,
    } = this.props

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

    const sendEmailButton = (
      <Button
        type="primary"
        disabled={disabled}
        onClick={() => this.handleEmail(this.state.selectedOrders)}
      >
        Send Email
      </Button>
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
  },
}) => ({
  fetchOrdersResolved,
  fetchOrdersPending,
  fetchOrdersRejected,
  fetchEmailResolved,
  saveEmailResolved,
  saveEmailRejected,
  searchResultsOrders,
})

export default connect(mapStateToProps)(Orders)
