import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Button } from 'antd'
import { CARD_TITLE_SECONDARY } from 'constants'

import { Card, Spacer } from 'components/common'

import {
  MAKE_ADMIN, REMOVE_ADMIN, DELETE_USER, INVITE_USER,
} from 'actions/types'

class TeamRoles extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool,
    users: PropTypes.object,
  }

  renderAdminActions = user => ([
    <a href="#" onClick={() => this.props.showModal(REMOVE_ADMIN, { user })}>Remove admin</a>,
    <a href="#" onClick={() => this.props.showModal(DELETE_USER, { user })}>Delete user</a>,
  ])

  renderEditorActions = user => ([
    <a href="#" onClick={() => this.props.showModal(MAKE_ADMIN, { user })}>Make admin</a>,
    <a href="#" onClick={() => this.props.showModal(DELETE_USER, { user })}>Delete user</a>,
  ])

  renderInviteButton = () => (
    <Button
      type="primary"
      onClick={() => this.props.showModal(INVITE_USER)}
    >
      Invite team member
    </Button>
  )

  render() {
    const { isAdmin, users, deleteUser } = this.props

    const adminData = []
    const editorData = []

    if (users.payload) {
      users.payload.forEach((user) => {
        if (user.admin) {
          return adminData.push({
            name: user.name,
            userId: user._id,
          })
        }

        return editorData.push({
          name: user.name,
          userId: user._id,
        })
      })
    }

    return (
      <Card
        title="Team roles"
        headStyle={CARD_TITLE_SECONDARY}
        extra={this.renderInviteButton()}
      >
        <div>
          <List
            size="small"
            header={<div style={{ fontWeight: 700 }}>Admin</div>}

            dataSource={adminData}
            renderItem={item => (
              <List.Item actions={isAdmin && this.renderAdminActions(item)}>{item.name}</List.Item>
            )}
          />
          <Spacer />
          <List
            size="small"
            header={<div style={{ fontWeight: 700 }}>Editor</div>}
            dataSource={editorData}
            renderItem={item => (
              <List.Item actions={isAdmin && this.renderEditorActions(item)}>{item.name}</List.Item>
            )}
          />
        </div>
      </Card>
    )
  }
}

export default TeamRoles
