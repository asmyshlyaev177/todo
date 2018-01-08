import React from 'react'
import TaskBtns from './TaskBtns.jsx'
import { connect } from 'react-redux'
import { editTask, removeTask } from '../actions' 

class Task extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hovered: false,
      editing: false,
      removing: false,
      oldTaskText: ''
    }
    this.btnEdit = this.btnEdit.bind(this)
    this.btnRemove = this.btnRemove.bind(this)
    this.btnConfirm = this.btnConfirm.bind(this)
    this.btnCancel = this.btnCancel.bind(this)
  }

  componentWillMount() {
    this.setState({ oldTaskText: this.props.task.title.slice() })
  }

  btnConfirm() {
    if (this.state.editing) {
      if (this.state.oldTaskText !== this.taskText.innerText) {
        this.props.editTask({ title: this.taskText.innerText.slice() })
      }
    } else {
      this.props.removeTask()
    }
    this.setState({ removing: false, editing: false })
  }

  btnEdit() {
    this.setState({ oldTaskText: this.taskText.innerText.slice(), editing: true })
    this.taskText.focus()
  }

  btnCancel() {
    if (this.state.editing) {
      this.taskText.innerText = this.state.oldTaskText
    }
    this.setState({ removing: false, editing: false })
  }

  btnRemove() {
    this.setState({ removing: true })
  }

  render() {
    let textClass
    let iconClass
    if (this.props.task.completed) {
      textClass = ''
      iconClass = 'fa-check-circle'
    } else {
      textClass = ' has-text-weight-semibold'
      iconClass = 'fa-circle-o'
    }

    return (
      <div
        onMouseEnter={ e => this.setState((prevState, props) => ({ hovered: true }) )}
        onMouseLeave={ e => this.setState((prevState, props) => ({ hovered: false }) )}
        className="columns task-body is-mobile is-multiline is-vcentered">
        <div className="check-icon-container column is-1-desktop is-1-tablet is-1-mobile">
          <i className= { 'check-icon fa btn is-pulled-right ' + iconClass } />
        </div>
        <div
          onClick={e => !(this.state.editing || this.state.removing)
            ? this.props.editTask({ completed: !this.props.task.completed })
            : false } 
          className={ "column notification task-text is-10-desktop is-10-mobile is-10-tablet" + textClass }
          contentEditable={ this.state.editing } suppressContentEditableWarning={true}
          ref={ taskText => this.taskText = taskText }>
          { this.props.task.title }
        </div>
        <div className="column task-btns is-1-desktop is-1-tablet is-11-mobile has-text-centered-desktop-only">

          <TaskBtns
            hovered={this.state.hovered}
            editing={this.state.editing || this.state.removing}
            edit={this.btnEdit}
            remove={this.btnRemove}
            confirm={this.btnConfirm}
            cancel={this.btnCancel}
          />

        </div>
      </div>
      )
}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editTask: payload => dispatch(
      editTask( ownProps.todoid, ownProps.task._id, payload)
    ),
    removeTask: () => dispatch(
      removeTask( ownProps.todoid, ownProps.task._id)
    )
  }
}

Task.displayName = 'Task'
Task = connect(null, mapDispatchToProps)(Task)
export default Task
