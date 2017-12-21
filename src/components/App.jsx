import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'
import Header from 'components/Header'
import TodoList from 'components/TodoList'
import Btns from 'components/Btns'
import { connect } from 'react-redux'
import { fetchAllTodo } from '../actions'


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchAllTodo
  }

  todoFiltered() {
    switch (this.props.filter) {
      case 'All':
        return this.props.todos
      case 'Pending':
        return this.props.todos.filter(todo => !todo.completed)
      case 'Completed':
        return this.props.todos.filter(todo => todo.completed)
    }
  }


  render() {
    return (
      <div>
        <Header />
        <Btns count={ this.todoFiltered().length } />

        <div className="container is-centered is-fluid">

          <div className="section columns is-mobile is-multiline">

            <TodoList todos={ this.todoFiltered() } />

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    filter: state.filter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTodo: dispatch(fetchAllTodo())
    }
}

App.displayName = 'App'
App = connect(mapStateToProps, mapDispatchToProps)(App)
export default App
