import {
  FETCH_TOURS_RESOLVED,
  FETCH_TOURS_PENDING,
  FETCH_TOURS_REJECTED,
  FETCH_SHOWS_RESOLVED,
  FETCH_SHOWS_PENDING,
  FETCH_SHOWS_REJECTED,
  FETCH_ORDERS_RESOLVED,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_REJECTED,
} from 'actions/types'

import { GET, API } from 'constants'

import { fetchHelper } from 'helpers/util'

export const search = (type, value) => async (dispatch) => {
  const action = {
    type,
    payload: value,
  }

  dispatch(action)
}

export const fetchTours = () => async (dispatch) => {
  let action = {
    type: FETCH_TOURS_PENDING,
  }
  dispatch(action)

  const endpoint = `${API}/data/fetchTours`

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
      type: FETCH_TOURS_RESOLVED,
      payload: payload || [],
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: FETCH_TOURS_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const fetchShows = searchQuery => async (dispatch) => {
  let action = {
    type: FETCH_SHOWS_PENDING,
  }
  dispatch(action)

  const endpoint = searchQuery ? `${API}/data/fetchShows${searchQuery}` : `${API}/data/fetchShows`

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
      type: FETCH_SHOWS_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: FETCH_SHOWS_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}

export const fetchOrders = searchQuery => async (dispatch) => {
  let action = {
    type: FETCH_ORDERS_PENDING,
  }
  dispatch(action)

  const endpoint = searchQuery ? `${API}/data/fetchOrders${searchQuery}` : `${API}/data/fetchOrders`

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
      type: FETCH_ORDERS_RESOLVED,
      payload,
    }

    dispatch(action)
  } catch (err) {
    action = {
      type: FETCH_ORDERS_REJECTED,
      payload: err,
    }
    dispatch(action)
  }
}
