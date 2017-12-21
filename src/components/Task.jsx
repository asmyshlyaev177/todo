import React from 'react'
import { connect } from 'react-redux'
import { toggleTask } from '../actions' 

class Task extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hovered: false,
      editing: false,
      removing: false,
      editHovered: false,
      okHovered: false,
      cancelHovered: false,
      removeHovered: false,
      oldTaskText: ''
    }
  }

  componentWillMount() {
    this.setState({ oldTaskText: this.props.task.title.slice() })
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
    let btnsEditRemove
    let btnsConfirm
    let btns

    let visibility = { visibility: this.state.hovered ? 'visible' : 'hidden' }
    let editClass = this.state.editHovered ? 'has-text-info' : ''
    let removeClass = this.state.removeHovered ? 'has-text-danger' : ''
    let okClass = this.state.okHovered ? 'has-text-success' : ''
    let cancelClass = this.state.cancelHovered ? 'has-text-danger' : ''

    let handleConfirm = () => {
      if (this.state.editing) {
        console.log('confirm edit')
      } else {
        console.log('confirm delete')
      }
      this.setState((prevState, props) => ({ removing: false, editing: false, okHovered: false, editHovered: true }) )
    }

    let handleEdit = () => {
      this.setState(
        (prevState, props) =>
        ({ oldTaskText: this.taskText.innerText.slice(), editing: true, editHovered: false, okHovered: true }) )
      this.taskText.focus()
    }

    let handleCancel = () => {
      if (this.state.editing) {
        this.taskText.innerText = this.state.oldTaskText
      }
      this.setState((prevState, props) => ({ removing: false, editing: false, cancelHovered: false, removeHovered: true }) )
    }

    let handleRemove = () => {
      this.setState((prevState, props) => ({ removing: true, removeHovered: false, cancelHovered: true}) )
    }

    btnsEditRemove = ( 
      <div className="columns is-multiline" style={ visibility }>
        <span className={ 'column is-inline-block has-text-centered is-12-desktop is-6-mobile is-12-tablet icon is-medium ' + editClass }>
          <i className="fa fa-2x fa-pencil btn" 
            onClick={ e => handleEdit() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ editHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ editHovered: false }) )}
          />
        </span>
        <span className={ 'column is-inline-block has-text-centered is-12-desktop is-5-mobile is-12-tablet icon is-medium ' + removeClass }>
          <i className="fa fa-2x fa-trash-o btn"
            onClick={ e => handleRemove() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ removeHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ removeHovered: false }) )}
          />
        </span>
      </div>
     )

    btnsConfirm = ( 
      <div className="columns is-multiline">
        <span className={ 'column is-inline-block has-text-centered is-12-desktop is-6-mobile is-12-tablet icon is-medium ' + okClass }>
          <i className="fa fa-2x fa-check-square btn"
            onClick={ e => handleConfirm() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ okHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ okHovered: false }) )}
          />
        </span>
        <span className={ 'column is-inline-block has-text-centered is-12-desktop is-5-mobile is-12-tablet icon is-medium ' + cancelClass }>
          <i className="fa fa-2x fa-ban btn"
            onClick={ e => handleCancel() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ cancelHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ cancelHovered: false }) )}
          />
        </span>
      </div>
     )

    if (this.state.editing || this.state.removing) {
      btns = btnsConfirm
    } else {
      btns = btnsEditRemove
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
          onClick={e => !(this.state.editing || this.state.removing) ? this.props.toggle() : false } 
          className={ "column notification task-text is-10-desktop is-10-mobile is-10-tablet" + textClass }
          contentEditable={ this.state.editing } suppressContentEditableWarning={true}
          ref={ taskText => this.taskText = taskText }>
          { this.props.task.title }
        </div>
        <div className="column task-btns is-1-desktop is-1-tablet is-11-mobile has-text-centered-desktop-only">

          { btns }

        </div>
      </div>
      )
}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggle: () => dispatch(toggleTask(ownProps.todoid, ownProps.task._id, !ownProps.task.completed))
  }
}

Task.displayName = 'Task'
Task = connect(null, mapDispatchToProps)(Task)
export default Task
