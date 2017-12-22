import { addAllTodo, changeFilter, updateTask } from '../actions'
import { combineReducers } from 'redux'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALL_TODO':
      return Object.assign([], action.todos)
    case 'UPDATE_TASK':
      return state.map(todo =>
	      todo._id === action.todoid
		    ? Object.assign({}, todo, { tasks: todo.tasks.map(oldTask =>
		      oldTask._id === action.taskid
		      ? action.task : oldTask
		    )})
	      : todo
      )
    case 'REMOVE_TASK':
      return state.map(todo =>
	      todo._id === action.todoid
		    ? Object.assign({}, todo, { tasks: todo.tasks
		      .filter(oldTask => oldTask._id !== action.taskid)
		    })
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
