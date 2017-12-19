import React from 'react'
import Header from 'components/Header'
import Todo from 'components/Todo'
import Btns from 'components/Btns'
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'
import axios from 'axios'

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
      .then(res => console.log(res.data))
  }

  render() {
    return (
      <div>

        <Header />

        <Btns />

        <div className="container is-centered is-fluid">

          <div className="section columns is-mobile is-multiline">
            <div className="column is-6-desktop is-12-mobile is-12-tablet">

              <Todo />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.displayName = 'App'

export default App
