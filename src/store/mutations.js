import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },

  [types.FETCH_ALL_TASKLIST] (state, payload) {
    state.board.lists = payload
  },

  [types.ADD_TASK] (state, payload) {
    const task = payload
    for (let i = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      if (list.id === task.listId) {
        list.items.push(task)
        break
      }
    }
  },

  [types.UPDATE_TASK] (state, payload) {
    throw new Error('UPDATE_TASK mutation should be implemented')
  },

  [types.REMOVE_TASK] (state, payload) {
    throw new Error('REMOVE_TASK mutation should be implemented')
  },

  [types.AUTH_LOGOUT] (state, payload) {
    state.auth = payload
  }
}
