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