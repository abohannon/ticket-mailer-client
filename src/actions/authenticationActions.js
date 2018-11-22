import fetch from 'isomorphic-fetch'
import { fetchHelper } from 'helpers/util'

import {
  PENDING,
  FULFILLED,
  REJECTED,
  POST,
  GET,
  API,
} from 'constants'

import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  SIGNUP_USER,
  VERIFY_EMAIL_RESOLVED,
  VERIFY_EMAIL_PENDING,
  VERIFY_EMAIL_REJECTED,
  VERIFY_TOKEN_RESOLVED,
  VERIFY_TOKEN_PENDING,
  VERIFY_TOKEN_REJECTED,
} from 'actions/types'

export const loginUser = body => async (dispatch) => {
  let action = {
    type: LOGIN_USER,
    status: PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/auth/login`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(body),
  }

  try {
    const response = await fetch(endpoint, options)
    const json = await response.json()
    const payload = response.ok ? json : null
    const status = response.ok ? FULFILLED : REJECTED

    action = {
      ...action,
      status,
      payload,
    }

    if (response.ok) {
      const { token } = json
      localStorage.clear()
      localStorage.setItem('tm_id_token', token)
    }

    dispatch(action)
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    }

    dispatch(action)
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER, status: FULFILLED })
  localStorage.removeItem('tm_id_token')
}

export const authenticateUser = token => async (dispatch) => {
  let action = {
    type: AUTH_USER,
    status: PENDING,
  }

  dispatch(action)

  const endpoint = `${API}/auth/user`

  const headers = {
    authorization: token,
  }

  const options = {
    method: GET,
    headers,
  }

  try {
    const response = await fetch(endpoint, options)
    const payload = await response.json()
    const status = response.ok ? FULFILLED : REJECTED

    if (!localStorage.getItem('tm_id_token')) {
      localStorage.setItem('tm_id_token', token)
    }

    action = {
      ...action,
      status,
      payload,
    }

    dispatch(action)
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    }

    dispatch(action)
  }
}

export const signupUser = userData => async (dispatch) => {
  let action = {
    type: SIGNUP_USER,
    status: PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/auth/signup`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(userData),
  }

  try {
    const response = await fetch(endpoint, options)
    const payload = await response.json()
    const status = response.ok ? FULFILLED : REJECTED

    action = {
      ...action,
      status,
      payload,
    }

    dispatch(action)
  } catch (error) {
    action = {
      ...action,
      status: REJECTED,
      error,
    }

    dispatch(action)
  }
}

export const verifyEmail = queryWithToken => async (dispatch) => {
  let action = {
    type: VERIFY_EMAIL_PENDING,
  }

  dispatch(action)

  const endpoint = `${API}/auth/verifyEmail${queryWithToken}`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method: GET,
    headers,
  }

  try {
    const response = await fetch(endpoint, options)
    const payload = await response.json()

    if (response.status !== 200) {
      action = {
        type: VERIFY_EMAIL_REJECTED,
        payload,
      }

      return dispatch(action)
    }

    action = {
      type: VERIFY_EMAIL_RESOLVED,
      payload,
    }

    return dispatch(action)
  } catch (err) {
    action = {
      type: VERIFY_EMAIL_REJECTED,
      payload: err,
    }

    return dispatch(action)
  }
}

export const verifyToken = queryWithToken => async (dispatch) => {
  console.log('VERIFY TOKEN', queryWithToken)
  let action = {
    type: VERIFY_TOKEN_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/user/verifyToken${queryWithToken}`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const options = {
    method: GET,
    headers,
  }

  try {
    const response = await fetch(endpoint, options)
    const payload = await response.json()

    if (response.status !== 200) {
      action = {
        type: VERIFY_TOKEN_REJECTED,
        payload,
      }

      return dispatch(action)
    }

    action = {
      type: VERIFY_TOKEN_RESOLVED,
      payload,
    }

    return dispatch(action)
  } catch (err) {
    action = {
      type: VERIFY_TOKEN_REJECTED,
      payload: err,
    }

    return dispatch(action)
  }
}
