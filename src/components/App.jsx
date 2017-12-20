import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'
import axios from 'axios'
import Header from 'components/Header'
import TodoList from 'components/TodoList'
import Btns from 'components/Btns'
import { connect } from 'react-redux'
import { addAllTodo } from '../actions'


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    axios.defaults.baseURL = 'http://127.0.0.1:3000/api/todo'
    axios.defaults.timeout = 3000
    this.getAllTodo()
  }

  getAllTodo() {
    axios.get('/')
      .then(res => {
        this.props.addAllTodo(res.data)
      })
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
        <Btns count={ this.props.todos.length } />

        <div className="container is-centered is-fluid">

          <div className="section columns is-mobile is-multiline">
            <div className="column is-6-desktop is-12-mobile is-12-tablet">

              <TodoList todos={ this.todoFiltered() } />
  
            </div>
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
    addAllTodo: todos => {
      dispatch(addAllTodo(todos))
    }
  }
}

App.displayName = 'App'
App = connect(mapStateToProps, mapDispatchToProps)(App)
export default App
