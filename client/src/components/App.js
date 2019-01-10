import React, { Component } from 'react'
import Form from './Form'
import List from './List'
import Post from './Post'
import TheGrid from "./TheGrid"
import NavBar from "./NavBar"
import './App.css'


class App extends Component {
  render() {
    //return 'x'
    return(
    <div>
      <NavBar/>
      <TheGrid/>
    </div>
    );
  }
}

  /*const App = () => (
  <React.Fragment>
  <Form />
  <h2>Assets</h2>
  <List />
  <h2>Posts</h2>
  <Post />
  </React.Fragment>
)*/

export default App
