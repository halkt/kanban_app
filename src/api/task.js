import client from './client'

export default {
  add: (token, { name, listId }) => {
    return new Promise((resolve, reject) => {
      client.post(`/tasks/add`, { name, listId }, { headers: { 'x-kbn-token': token } })
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
