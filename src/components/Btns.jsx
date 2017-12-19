import React from 'react'

function Btns(props) {
  return (
    <div className="container has-text-centered add-todo-container">
      <div>Todo count: { props.count || 0 }</div>
      <a className="button is-success is-outlined is-rounded">Add todo</a>
      <a className="button is-danger is-outlined is-rounded">Clean completed</a>
    </div>
    )
}

Btns.displayName = 'Btns'
export default Btns
