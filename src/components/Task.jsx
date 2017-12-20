import React from 'react'

function Task(props) {

  return (
    <div className="columns task-body">
      <div className="notification task-text column is-11-desktop is-12-mobile is-11-tablet">
        { props.task.title }
      </div>
      <div className="column task-btns is-1-desktop is-1-tablet is-11-mobile has-text-centered-desktop-only">
        <div className="columns is-multiline">
          <span className="column is-inline-block has-text-centered is-12-desktop is-6-mobile is-12-tablet icon is-medium has-text-success">
            <i className="fa fa-2x fa-check-square btn"></i>
          </span>
          <span className="column is-inline-block has-text-centered is-12-desktop is-5-mobile is-12-tablet icon is-medium has-text-danger">
            <i className="fa fa-2x fa-ban btn"></i>
          </span>
        </div>
      </div>
    </div>
    )
}

Task.displayName = 'Task'
export default Task
