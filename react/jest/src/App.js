import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Video = props => {
  const { code } = props;
  return <iframe 
    title="video"
    width="560" 
    height="315" 
    src={"https://www.youtube.com/embed/"+code}
    frameBorder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
}

class ElementoFuncion extends Component {
  render() {
    let valor = this.dadoJusto();
    let cadena = this.cadenaSimple();
    return (
    <div>
      <span>{valor}</span>
      <p>{cadena}</p>
    </div>
    )
  }
  
  dadoJusto(){
    return 4;
  }

  cadenaSimple(){
    return "OK";
  }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Biblioteca de Videos</h1>
          <div>
            <Video code="hj5LjmVUlcE" />
            <Video code="spyJE-qKYu8" />
          </div>
          <div>
            <ElementoFuncion></ElementoFuncion>
          </div>
          {this.dadoJusto2()}<br/>
          {this.cadenaSimple2()}
        </header>
      </div>
    );
  }

  dadoJusto2(){
    return 4;
  }

  cadenaSimple2(){
    return "OK";
  }
}

export default App;
