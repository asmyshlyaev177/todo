import React from 'react'

class TaskBtns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editHovered: false,
      okHovered: false,
      cancelHovered: false,
      removeHovered: false
    }
  }

  render() {

    let btnsEditRemove
    let btnsConfirm
    let btns

    let visibility = { visibility: this.props.hovered ? 'visible' : 'hidden' }
    let editClass = this.state.editHovered ? 'has-text-info' : ''
    let removeClass = this.state.removeHovered ? 'has-text-danger' : ''
    let okClass = this.state.okHovered ? 'has-text-success' : ''
    let cancelClass = this.state.cancelHovered ? 'has-text-danger' : ''

    let handleConfirm = () => {
      this.props.confirm()
      this.setState({ okHovered: false, editHovered: true })
    }

    let handleEdit = () => {
      this.props.edit()
      this.setState({ editHovered: false, okHovered: true })
    }

    let handleCancel = () => {
      this.props.cancel()
      this.setState({ cancelHovered: false, removeHovered: true })
    }

    let handleRemove = () => {
      this.props.remove()
      this.setState({ removeHovered: false, cancelHovered: true })
    }

    let commonClasses = 'column is-inline-block has-text-centered is-6-desktop is-6-mobile is-6-tablet icon is-medium task-icon '

    btnsEditRemove = ( 
      <div className="columns" style={ visibility }>
        <span className={ commonClasses + editClass }>
          <i className="fa fa-pencil btn" 
            onClick={ e => handleEdit() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ editHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ editHovered: false }) )}
          />
        </span>
        <span className={ commonClasses + removeClass }>
          <i className="fa fa-trash-o btn"
            onClick={ e => handleRemove() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ removeHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ removeHovered: false }) )}
          />
        </span>
      </div>
      )

    btnsConfirm = ( 
      <div className="columns">
        <span className={ commonClasses + okClass }>
          <i className="fa fa-check-square btn"
            onClick={ e => handleConfirm() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ okHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ okHovered: false }) )}
          />
        </span>
        <span className={ commonClasses + cancelClass }>
          <i className="fa fa-ban btn"
            onClick={ e => handleCancel() }
            onMouseEnter={ e => this.setState((prevState, props) => ({ cancelHovered: true }) )}
            onMouseLeave={ e => this.setState((prevState, props) => ({ cancelHovered: false }) )}
          />
        </span>
      </div>
      )

    if (this.props.editing) {
      btns = btnsConfirm
    } else {
      btns = btnsEditRemove
    }

    return (
      btns  
    )
}
}

TaskBtns.displayName = 'TaskBtns'
export default TaskBtns
