import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactPlayer 
        url='http://52.206.240.203:1935/Livestream/chemas/_source/playlist.m3u8' 
        playing
        />
      </div>
    );
  }
}

export default App;
