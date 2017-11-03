import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(){
  super()
  this.state={recording:false}
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audioContext = new AudioContext();
  }

  componentDidMount(){
    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=> {
        this.audio.srcObject = stream;
        this.audio.play()
      }).catch((err) =>{
          console.log('err' + err);
      });
  
    } else {
    console.log('getUserMedia not supported!');
    }
  }
  render() {
    return (
      <div className="App">
        start audio 
        <audio  muted={!this.state.recording} ref={(x) => this.audio = x} />
        <input type='checkbox' value={this.state.recording} onChange={(e) =>this.setState({recording:e.target.checked})} />
      </div>
     
    );
  }
}



export default App;
