import { addAllTodo, changeFilter } from '../actions'
import { combineReducers } from 'redux'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALL_TODO':
      return Object.assign([], action.todos)

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
