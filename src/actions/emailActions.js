import {
  FETCH_EMAIL_RESOLVED,
  FETCH_EMAIL_PENDING,
  FETCH_EMAIL_REJECTED,
  SAVE_EMAIL_RESOLVED,
  SAVE_EMAIL_PENDING,
  SAVE_EMAIL_REJECTED,
  SEND_EMAIL_RESOLVED,
  SEND_EMAIL_PENDING,
  SEND_EMAIL_REJECTED,
} from 'actions/types'
import { GET, POST, API } from 'constants'
import { fetchHelper } from 'helpers/util'

export const fetchEmail = searchQuery => async (dispatch) => {
  let action = {
    type: FETCH_EMAIL_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/email/fetchEmail${searchQuery}`

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
      type: FETCH_EMAIL_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: FETCH_EMAIL_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const saveEmail = data => async (dispatch) => {
  let action = {
    type: SAVE_EMAIL_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/email/saveEmail`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(data),
  }

  try {
    const payload = await fetchHelper(endpoint, options)

    action = {
      type: SAVE_EMAIL_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: SAVE_EMAIL_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const sendEmail = emailData => async (dispatch) => {
  let action = {
    type: SEND_EMAIL_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/email/sendEmail`

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('tm_id_token'),
  }

  const options = {
    method: POST,
    headers,
    body: JSON.stringify(emailData),
  }

  try {
    const payload = await fetchHelper(endpoint, options)

    action = {
      type: SEND_EMAIL_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: SEND_EMAIL_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}
