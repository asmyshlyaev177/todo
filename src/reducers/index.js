import { addAllTodo } from '../actions'
import { combineReducers } from 'redux'

const initialState = {
 todos: [] 
}

const addAllTodos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ALL_TODO':
      return Object.assign([], action.todos)

    default:
      return state
  }
}

const todoApp = combineReducers({
  todos: addAllTodos
})

export default todoApp
