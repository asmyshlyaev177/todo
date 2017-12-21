import { addAllTodo, changeFilter, updateTask } from '../actions'
import { combineReducers } from 'redux'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALL_TODO':
      return Object.assign([], action.todos)
    case 'UPDATE_TASK':
      // console.log(action.todoid, '   ', action.taskid, '   ', action.task)
      // console.log(state)
      return state.map(todo =>
	      todo._id === action.todoid
		    ? Object.assign({}, todo, { tasks: todo.tasks.map(
		        t => t._id === action.taskid
		        ? action.task
		        : t)})
	      : todo
      )

    default:
      return state
  }
}

const filter = (state = 'All', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.filter 

    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  filter
})

export default todoApp
