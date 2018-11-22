import { combineReducers } from 'redux'
import authentication from './authentication'
import application from './application'
import user from './user'
import email from './email'
import modal from './modal'

export default combineReducers({
  authentication,
  application,
  user,
  email,
  modal,
})
