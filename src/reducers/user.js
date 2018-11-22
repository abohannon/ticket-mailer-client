import {
  UPDATE_USER_RESOLVED,
  UPDATE_USER_PENDING,
  UPDATE_USER_REJECTED,
  FETCH_USERS_RESOLVED,
  FETCH_USERS_PENDING,
  FETCH_USERS_REJECTED,
  DELETE_USER_RESOLVED,
  DELETE_USER_PENDING,
  DELETE_USER_REJECTED,
  INVITE_USER_RESOLVED,
  INVITE_USER_PENDING,
  INVITE_USER_REJECTED,
} from 'actions/types'

const INITIAL_STATE = {
  updateUserResolved: {},
  updateUserPending: {},
  updateUserRejected: {},
  fetchUsersResolved: {},
  fetchUsersPending: {},
  fetchUsersRejected: {},
  deleteUserResolved: {},
  deleteUserPending: {},
  deleteUserRejected: {},
  inviteUserResolved: {},
  inviteUserPending: {},
  inviteUserRejected: {},
}

export default (state = INITIAL_STATE, action) => {
  const { status, type, payload } = action

  switch (type) {
    case UPDATE_USER_RESOLVED: {
      const newState = {
        updateUserResolved: action,
        updateUserPending: {},
        updateUserRejected: {},
      }
      return { ...state, ...newState }
    }
    case UPDATE_USER_PENDING: {
      const newState = {
        updateUserResolved: {},
        updateUserPending: action,
        updateUserRejected: {},
      }
      return { ...state, ...newState }
    }
    case UPDATE_USER_REJECTED: {
      const newState = {
        updateUserResolved: {},
        updateUserPending: {},
        updateUserRejected: action,
      }
      return { ...state, ...newState }
    }
    case FETCH_USERS_RESOLVED: {
      const newState = {
        fetchUsersResolved: action,
        fetchUsersPending: {},
        fetchUsersRejected: {},
      }

      return { ...state, ...newState }
    }
    case FETCH_USERS_PENDING: {
      const newState = {
        fetchUsersResolved: {},
        fetchUsersPending: action,
        fetchUsersRejected: {},
      }

      return { ...state, ...newState }
    }
    case FETCH_USERS_REJECTED: {
      const newState = {
        fetchUsersResolved: {},
        fetchUsersPending: {},
        fetchUsersRejected: action,
      }

      return { ...state, ...newState }
    }
    case DELETE_USER_RESOLVED: {
      const newState = {
        deleteUserResolved: action,
        deleteUserPending: {},
        deleteUserRejected: {},
      }

      return { ...state, ...newState }
    }
    case DELETE_USER_PENDING: {
      const newState = {
        deleteUserResolved: {},
        deleteUserPending: action,
        deleteUserRejected: {},
      }

      return { ...state, ...newState }
    }
    case DELETE_USER_REJECTED: {
      const newState = {
        deleteUserResolved: {},
        deleteUserPending: {},
        deleteUserRejected: action,
      }
      return { ...state, ...newState }
    }
    case INVITE_USER_RESOLVED: {
      const newState = {
        inviteUserResolved: action,
        inviteUserPending: {},
        inviteUserRejected: {},
      }

      return { ...state, ...newState }
    }
    case INVITE_USER_PENDING: {
      const newState = {
        inviteUserResolved: {},
        inviteUserPending: action,
        inviteUserRejected: {},
      }

      return { ...state, ...newState }
    }
    case INVITE_USER_REJECTED: {
      const newState = {
        inviteUserResolved: {},
        inviteUserPending: {},
        inviteUserRejected: action,
      }
      return { ...state, ...newState }
    }
    default:
      return state
  }
}
