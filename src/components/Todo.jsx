import React from 'react'
import Task from 'components/Task'

function Todo(props) {
  return (
    <div className="column is-6-desktop is-12-mobile is-12-tablet">
      <div className="card">
        <header className="card-header">
          <p className="task-title has-text-grey-darker card-header-title is-centered">
            { props.todo.title }
          </p>
        </header>
        <div className="card-content container is-fluid is-block">

          { props.todo.tasks.map(task => 
          <Task key={task._id} task={task} todoid={props.todo._id} />
          )}

        </div>
        <footer className="card-footer">
        </footer>
      </div>
    </div>
    )
}

Todo.displayName = 'Todo'
export default Todo
