import React from 'react'
import ReactDOM from 'react-dom'

import socketio from 'socket.io-client'
const socket = socketio.connect('http://localhost:3000')


class ChatForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {name: '',message:''}
  }
  nameChange(e){
    this.setState({name: e.target.value})
  }
  bodyChange(e){
    this.setState({body:e.target.value})
  }
  send(){
    socket.emit('chat-msg',{
      name: this.state.name,
      message: this.state.message
    })
    this.setState({message: ''})
  }
  render(){
    return(
      <div>
       名前:<br/>
       <input value={this.state.name}
       onChange={e => this.nameChange(e)}/><br/>
       メッセージ:<br/>
       <input value={this.state.body}
       onChange={e => this.bodyChange(e)}/><br/>
       <button onClick={e=> this.send()}>送信</button>
      </div>
    )
  }
}

class ChatApp extends React.Component{
  constructor(props){
    super(props)
    this.state={
      logs: []
    }
  }
  componentDidMount(){
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs
      obj.key = 'key_' + (this.state.logs.length + 1)
      console.log(obj)
      logs2.unshift(obj)
      this.setState({logs: logs2})

    } )
  }
  render(){
    const messages = this.state.logs.map( e => (
      <div key={e.key} >
       <span>{e.name}</span>
       <span>{e.message}</span>
      </div>
    ))
    return(
      <div>
       <h1>リアルチャット</h1>
       <ChatForm/>
       <div>{messages}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <ChatApp/>,
  document.getElementById('root')
)
