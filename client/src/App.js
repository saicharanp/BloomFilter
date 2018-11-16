import React, { Component } from 'react';
import './App.css';
import Album from './Album';

class App extends Component {
  state = {users: []}
  
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
      return (
        // <div className="flex-container">
        //   <h1> bloom filter </h1>
        //   <button id="index" className="flex-container-item"> index </button>
        //   <button id="add" className="flex-container-item"> add </button>
        //   <button id="test" className="flex-container-item"> test </button>

        // </div>
        <Album />
      );
  }
}

export default App;
