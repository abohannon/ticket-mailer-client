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

import {
 GET, POST, DELETE, API 
} from 'constants'

import { fetchHelper } from 'helpers/util'

export const inviteUser = email => async (dispatch) => {
  let action = {
    type: INVITE_USER_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/user/inviteNewUser?email=${email}`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  }

  const options = {
    method: GET,
    headers,
  }

  try {
    const payload = fetchHelper(endpoint, options)

    action = {
      type: INVITE_USER_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: INVITE_USER_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const deleteUser = userId => async (dispatch) => {
  let action = {
    type: DELETE_USER_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/user/deleteUser?userId=${userId}`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  }

  const options = {
    method: DELETE,
    headers,
  }

  try {
    const payload = fetchHelper(endpoint, options)

    action = {
      type: DELETE_USER_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: DELETE_USER_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const fetchUsers = () => async (dispatch) => {
  let action = {
    type: FETCH_USERS_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/user/fetchUsers`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  }

  const options = {
    method: GET,
    headers,
  }

  try {
    const payload = await fetchHelper(endpoint, options)

    action = {
      type: FETCH_USERS_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: FETCH_USERS_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const updateUser = updatedUserData => async (dispatch) => {
  let action = {
    type: UPDATE_USER_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/user/updateUser`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(updatedUserData),
  }

  try {
    const payload = fetchHelper(endpoint, options)

    action = {
      type: UPDATE_USER_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: UPDATE_USER_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}
