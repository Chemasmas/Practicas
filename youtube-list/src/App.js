import React, { Component } from 'react';
import './App.css';
import VideoList from './components/VideoList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <VideoList></VideoList>
      </div>
    );
  }
}

export default App;
