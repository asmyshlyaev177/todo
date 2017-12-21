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

export function toggleTask(todoid, taskid, completed) {
  return function(dispatch) {
    http.patch(`/${todoid}/task/${taskid}/`, { completed: completed })
      .then(data => dispatch(updateTask(todoid, taskid, data.data)))
  }
}

export function updateTask(todoid, taskid, task) {
  return { type: 'UPDATE_TASK', todoid, taskid, task }
}
