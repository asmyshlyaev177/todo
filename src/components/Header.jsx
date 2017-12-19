import React from 'react'

function Header(props) {

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
          <li className="is-active"><a>All todo</a></li>
          <li><a>Pending</a></li>
          <li><a>Completed</a></li>
        </ul>
      </div>  

    </section>
    )
}

Header.displayName = 'Header'
export default Header
