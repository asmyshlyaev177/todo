import React from 'react'

class Btns extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container has-text-centered add-todo-container">
        <div>Todo count: 5</div>
        <a className="button is-success is-outlined is-rounded">Add todo</a>
        <a className="button is-danger is-outlined is-rounded">Clean completed</a>
      </div>
      )
  }
}

Btns.displayName = 'Btns'
export default Btns
