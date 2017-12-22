import http from '../http'

export function fetchAllTodo() {
  return function(dispatch) {
    http.get('/')
      .then(data => dispatch(addAllTodo(data.data)))
  }
}

export function addAllTodo(todos) {
  return { type: 'ADD_ALL_TODO', todos }
}

export function changeFilter(filter) {
  return { type: 'CHANGE_FILTER', filter }
}

export function editTask(todoid, taskid, payload) {
  return function(dispatch) {
    http.patch(`/${todoid}/task/${taskid}/`, payload)
      .then(data => dispatch(updateTask(todoid, taskid, data.data)))
  }
}

export function removeTask(todoid, taskid, payload) {
  return function(dispatch) {
    http.delete(`/${todoid}/task/${taskid}/`)
      .then(data => dispatch(removeTaskStore(todoid, taskid))
      )
  }
}

export function removeTaskStore(todoid, taskid) {
  return { type: 'REMOVE_TASK', todoid, taskid }
}

export function updateTask(todoid, taskid, task) {
  return { type: 'UPDATE_TASK', todoid, taskid, task }
}
