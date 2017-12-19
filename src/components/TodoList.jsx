import React from 'react'
import Todo from './Todo'

function TodoList(props) {
  console.log(props)
  if (props.todos.length ) {
    return (
      props.todos.map(t => 
        <Todo key={t._id} todo={t} />
      )
    )
  } 
  return null
}

export default TodoList
