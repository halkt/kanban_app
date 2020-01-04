import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },

  [types.FETCH_ALL_TASKLIST] (state, payload) {
    state.board.lists = payload
  },

  [types.ADD_TASK] (state, payload) {
    throw new Error('ADD_TASK mutation should be implemented')
  },

  [types.UPDATE_TASK] (state, payload) {
    throw new Error('UPDATE_TASK mutation should be implemented')
  },

  [types.REMOVE_TASK] (state, payload) {
    throw new Error('REMOVE_TASK mutation should be implemented')
  },

  [types.AUTH_LOGOUT] (state, payload) {
    throw new Error('AUTH_LOGOUT mutation should be implemented')
  }
}
