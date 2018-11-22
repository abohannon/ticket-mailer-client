import {
  SHOW_MODAL,
  HIDE_MODAL,
} from 'actions/types'

const INITIAL_STATE = {
  modalOpen: false,
  modalType: '',
  modalProps: '',
}

export default (state = INITIAL_STATE, action) => {
  const { type, modalType, modalProps } = action
  switch (type) {
    case SHOW_MODAL:
      return {
        modalOpen: true,
        modalType,
        modalProps,
      }
    case HIDE_MODAL:
      return INITIAL_STATE
    default:
      return state
  }
}
