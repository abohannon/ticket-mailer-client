import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { Spacer } from 'components/common'

// Components
import UserInfo from 'components/UserSettings/UserInfo'
import TeamRoles from 'components/UserSettings/TeamRoles'

// Actions
import { updateUser, fetchUsers, deleteUser } from 'actions/userActions'
import { showModal } from 'actions/modalActions'

class UserSettings extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUsers())
  }

  componentDidUpdate(prevProps) {
    const { user, dispatch } = this.props

    if (!isEmpty(prevProps.user.deleteUserPending) && isEmpty(user.deleteUserPending)) {
      if (!isEmpty(user.deleteUserResolved)) {
        dispatch(fetchUsers())
      }
    }
  }

  updateUserInfo = (data) => {
    const { dispatch } = this.props
    dispatch(updateUser(data))
  }

  deleteUser = async (userId) => {
    const { dispatch } = this.props
    dispatch(deleteUser(userId))
  }

  render() {
    const { currentUser, user, dispatch } = this.props

    const userInfoProps = {
      currentUser,
      user,
      updateUserInfo: this.updateUserInfo,
    }

    const teamRolesProps = {
      isAdmin: currentUser.admin,
      users: user.fetchUsersResolved,
      deleteUser: this.deleteUser,
      showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
    }

    return (
      <div>
        <UserInfo {...userInfoProps} />
        <Spacer />
        <TeamRoles {...teamRolesProps} />
      </div>
    )
  }
}

const mapStateToProps = ({
  authentication: { currentUser },
  user,
}) => ({
  currentUser,
  user,
})

export default connect(mapStateToProps)(UserSettings)
