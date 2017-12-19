import React from 'react'
import Header from 'components/Header'
import Todo from 'components/Todo'
import Btns from 'components/Btns'

class App extends React.Component {
  constructor(props) {
    super(props)
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
