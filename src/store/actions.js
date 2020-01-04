/* eslint-disable no-unused-vars */
import * as types from './mutation-types'
import { Auth, List, Task } from '../api'
/* eslint-enable no-unused-vars */

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        localStorage.setItem('token', token)
        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch(err => { throw err })
  },

  fetchLists: ({ commit, state }) => {
    return List.fetch(state.auth.token)
      .then(({ lists }) => {
        commit(types.FETCH_ALL_TASKLIST, lists)
      })
      .catch(err => { throw err })
  },

  addTask: ({ commit, state }, { listId, name }) => {
    return Task.add(state.auth.token, { listId, name })
      .then((task) => {
        commit(types.ADD_TASK, task)
      })
      .catch(err => { throw err })
  },

  updateTask: ({ commit }) => {
    // TODO:
    throw new Error('updateTask action should be implemented')
  },

  removeTask: ({ commit, state }, { id, listId }) => {
    return Task.remove(state.auth.token, { id, listId })
      .then(() => {
        commit(types.REMOVE_TASK, { id, listId })
      })
      .catch(err => { throw err })
  },

  logout: ({ commit, state }) => {
    return Auth.logout(state.auth.token)
      .then(() => {
        localStorage.removeItem('token')
        commit(types.AUTH_LOGOUT, { token: null, userId: null })
      })
      .catch(err => { throw err })
  }
}
