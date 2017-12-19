import React from 'react'
import Header from 'components/Header'
import Todo from 'components/Todo'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>

        <Header />

        <div className="container has-text-centered add-todo-container">
          <div>Todo count: 5</div>
          <a className="button is-success is-outlined is-rounded">Add todo</a>
          <a className="button is-danger is-outlined is-rounded">Clean completed</a>
        </div>


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
