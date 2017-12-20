import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../actions'

class  Header extends React.Component {
  constructor(props) {
    super(props)

    this.tabs = [
      { text: 'All todo', val: 'All' },
      { text: 'Pending', val: 'Pending' },
      { text: 'Completed', val: 'Completed' }
    ]
  }

  changeFilter(filter) {
    this.props.changeFilter(filter.slice())
  }

  render() {
    return (
      <section className="header hero is-success is-bold">
        <div className="hero-body has-text-centered">
          <div className="container">
            <h1 className="title">
              Simple todo app
            </h1>
          </div>
        </div>

        <div className="tabs is-toggle is-fullwidth is-boxed is-centered">
          <ul>
            { this.tabs.map(tab =>
            <li key={ tab.val } className={ tab.val === this.props.filter ? 'is-active' : ''}>
              <a onClick={e => this.changeFilter(tab.val)}>{ tab.text }</a>
            </li>)
            }
          </ul>
        </div>  

      </section>
      )
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => {
      dispatch(changeFilter(filter))
    }
  }
}

Header.displayName = 'Header'
Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header
