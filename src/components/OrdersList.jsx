import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Badge, Tooltip } from 'antd'
import { Table } from 'components/common'

class OrdersList extends Component {
  static propTypes = {
    onUpdate: PropTypes.func,
    loading: PropTypes.bool,
    orders: PropTypes.array,
    selectedRowKeys: PropTypes.array,
  }

  renderStatusMessage = (status) => {
    const { email_sent, email_error } = status

    if (email_sent) {
      return <Badge status="success" text="Sent" />
    }

    if (email_error) {
      return (
        <Tooltip title={email_error.message}>
          <Badge status="error" text="Error" />
        </Tooltip>
      )
    }

    return <Badge status="default" text="Unsent" />
  };

  renderTableData = () => {
    const { orders } = this.props

    if (orders && orders.length > 0) {
      return (
        orders.map((order, index) => ({
          key: index,
          orderNumber: <a href={`${SHOPIFY_STORE_URL}/admin/orders/${order.id}`} target="_blank">{order.name}</a>,
          name: `${order.customer.first_name} ${order.customer.last_name}`,
          email: order.customer.email,
          status: this.renderStatusMessage(order),
          id: order.id,
        }))
      )
    }

    return null
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { onUpdate } = this.props

    const filteredRowData = selectedRows.map((row) => {
      const { key, status, ...rest } = row

      return rest
    })

    onUpdate(filteredRowData, selectedRowKeys)
  }

  render() {
    const { loading, selectedRowKeys } = this.props

    const columns = [{
      title: 'Order #',
      dataIndex: 'orderNumber',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    }]

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    }

    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.renderTableData()}
        pagination={false}
        loading={loading}
      />
    )
  }
}

export default OrdersList
