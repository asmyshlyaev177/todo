import React from 'react'
import Task from 'components/Task'

class Todo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title is-centered">
            Component
          </p>
        </header>
        <div className="card-content container is-fluid is-block">

          <Task />

        </div>
        <footer className="card-footer">
        </footer>
      </div>
      )
  }
}

Todo.displayName = 'Todo'
export default Todo
