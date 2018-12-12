import React, { Component } from 'react';
import Beforeunload from 'react-beforeunload';
//import logo from './logo.svg';

import axios from 'axios';
import './App.css';
import { 
  join,
  sendMessage,
  logout,
  onJoined,
  onDisconect,
  onRefresh
 } from './utils';


 const BASE_PATH ="http://34.227.152.75";

class App extends Component {

  //Initial State
  state = {
    msg:"",
    email:""
  }

  static defaultProps = {
    channel:"test",
    fName:"Fake",
    lName:"Client",
  }

  constructor(props){
    super(props);
    
    this.conectar = this.conectar.bind(this);
    this.desconectar = this.desconectar.bind(this);
    this.send = this.send.bind(this);
    this.updateMSG = this.updateMSG.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    
    this.initChat = this.initChat.bind(this);
    this.storeChat = this.storeChat.bind(this);
    this.refreshChat = this.refreshChat.bind(this);

    this.sendM = this.sendM.bind(this);


    onJoined(this.initChat);
    onDisconect();
    onRefresh(this.refreshChat);
  }

  updateMSG(e){
    this.setState({
      msg:e.target.value,
    })
  }

  updateEmail(e){
    this.setState({
      email:e.target.value,
    })
  }

  conectar(){
    let {channel,fName,lName} = this.props;
    let {email} = this.state
    join( {channel,email,fName,lName} );
  }
  desconectar(){
    let {channel} = this.props;
    logout( {channel} );
  }

  send(){
    //let {channel} = this.props;
    let {msg} = this.state;
    
    let {id} = this.state.channel.conversation;
    let userID = this.state.channel.user.id;
    //http://34.227.152.75/api/v1/chat/:conversationId
    axios.post(`${BASE_PATH}/api/v1/chat/${id}`,{
      conversationId:id,
      message:msg,
      userId:userID
    }).then( this.sendM );
  }

  sendM(data){
    let {channel} = this.props;
    let {msg} = this.state;
    console.log("Mensaje enviado",data)

    sendMessage( {channel,msg} )  
  }

  initChat(data) {
    //console.log("Desde el componente");
    //console.log(data);
    this.setState({
      channel:data
    });
    //Recuperar los mensajes
    //this.state.channel.conversation
    let {id} = this.state.channel.conversation;
    axios.get(`${BASE_PATH}/api/v1/chat/${id}`)
    .then(this.storeChat);
  } 

  storeChat(resp) {
    console.log(resp);
    if(resp.status===200){
      this.setState({
        convo:resp.data.conversation
      })
    }
  }

  refreshChat(data) {
    console.log(data);
    let {id} = this.state.channel.conversation;
    axios.get(`${BASE_PATH}/api/v1/chat/${id}`)
    .then(this.storeChat);
  } 

  render() {
    return (
      <React.Fragment>
        <Beforeunload onBeforeunload={e => e.preventDefault()} />  
        <button onClick={this.conectar} >Conectar</button>
        <button onClick={this.desconectar} >Desconectar</button>
        <br/>
        <input type="text" name="email" value={this.state.email} onChange={this.updateEmail}></input>
        <br/>
        

        <div style={{height:20+"em",overflow:"scroll"}}>
        
      {this.state.convo && this.state.convo.map( (item,i) => {
      return <p key={i} style={ {margin :0+"px"} }><span>{item.author.profile.firstName} {item.author.profile.lastName} </span>{item.body}</p>}) } 
          
        </div>
        <button onClick={this.send} >Enviar</button>
        <input type="text" name="msg" value={this.state.msg} onChange={this.updateMSG}></input>
      </React.Fragment>      
    );
  }
}

export default App;
