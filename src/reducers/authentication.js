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

import {
  PENDING,
  REJECTED,
} from 'constants'

const INITIAL_STATE = {
  isAuthenticated: false,
  pending: {},
  fulfilled: {},
  rejected: {},
  currentUser: {},
  verifyEmailResolved: {},
  verifyEmailPending: {},
  verifyEmailRejected: {},
  verifyTokenResolved: {},
  verifyTokenPending: {},
  verifyTokenRejected: {},
}

export default (state = INITIAL_STATE, action) => {
  const { status, type, payload } = action

  switch (type) {
    case LOGIN_USER:
    case AUTH_USER: {
      if (status === PENDING) {
        const newState = {
          pending: action,
          fulfilled: {},
          rejected: {},
          currentUser: {},
        }

        return { ...state, ...newState }
      }

      if (status === REJECTED) {
        const newState = {
          isAuthenticated: false,
          pending: {},
          fulfilled: {},
          rejected: action,
          currentUser: {},
        }

        return { ...state, ...newState }
      }

      const newState = {
        isAuthenticated: true,
        pending: {},
        fulfilled: action,
        rejected: {},
        currentUser: payload,
      }

      return { ...state, ...newState }
    }
    case LOGOUT_USER: {
      const newState = {
        isAuthenticated: false,
        fulfilled: action,
        currentUser: {},
      }

      return { ...state, ...newState }
    }
    case SIGNUP_USER: {
      if (status === PENDING) {
        const newState = {
          pending: action,
          fulfilled: {},
          rejected: {},
        }

        return { ...state, ...newState }
      }

      if (status === REJECTED) {
        const newState = {
          pending: {},
          fulfilled: {},
          rejected: action,
        }

        return { ...state, ...newState }
      }

      const newState = {
        pending: {},
        fulfilled: action,
        rejected: {},
      }

      return { ...state, ...newState }
    }
    case VERIFY_EMAIL_RESOLVED: {
      const newState = {
        verifyEmailResolved: action,
        verifyEmailPending: {},
        verifyEmailRejected: {},
      }
      return { ...state, ...newState }
    }
    case VERIFY_EMAIL_PENDING: {
      const newState = {
        verifyEmailResolved: {},
        verifyEmailPending: action,
        verifyEmailRejected: {},
      }
      return { ...state, ...newState }
    }
    case VERIFY_EMAIL_REJECTED: {
      const newState = {
        verifyEmailResolved: {},
        verifyEmailPending: {},
        verifyEmailRejected: action,
      }
      return { ...state, ...newState }
    }
    case VERIFY_TOKEN_RESOLVED: {
      const newState = {
        verifyTokenResolved: action,
        verifyTokenPending: {},
        verifyTokenRejected: {},
      }
      return { ...state, ...newState }
    }
    case VERIFY_TOKEN_PENDING: {
      const newState = {
        verifyTokenResolved: {},
        verifyTokenPending: action,
        verifyTokenRejected: {},
      }
      return { ...state, ...newState }
    }
    case VERIFY_TOKEN_REJECTED: {
      const newState = {
        verifyTokenResolved: {},
        verifyTokenPending: {},
        verifyTokenRejected: action,
      }
      return { ...state, ...newState }
    }
    default:
      return state
  }
}
