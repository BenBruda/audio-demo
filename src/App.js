import React, { Component } from 'react';
import './App.css';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

class App extends Component {
  constructor(){
  super()
  this.state={ samples: [] }
  this.audioContext = new AudioContext();
  this.samples = []
  }

  startRecord = ()=>{
    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=> {
        this.audioInput = this.audioContext.createMediaStreamSource(stream);
        this.recorder = this.audioContext.createScriptProcessor(2048, 1, 1);
        this.recorder.onaudioprocess = e => {
          const samples = e.inputBuffer.getChannelData(0);
          this.samples = this.samples.concat(Array.prototype.slice.call(samples));
        };
        this.audioInput.connect(this.recorder);
        this.recorder.connect(this.audioContext.destination);
        // this.audio.play()
      }).catch((err) =>{
          console.log('err' + err);
      });
  
    } else {
    console.log('getUserMedia not supported!');
    }
  }
  stopRecord = ()=>{ 
    this.recorder && this.recorder.disconnect();
    this.audioInput && this.audioInput.disconnect();
    // this.setState({samples:this.samples});
  }

  play = ()=>{ 

    // const audio = new Audio()
    // audio.srcObject = 

    this.player = this.audioContext.createBufferSource();

    const newBuffer = this.audioContext.createBuffer(1, this.samples.length, 44100);
    newBuffer.getChannelData(0).set(this.samples);

    this.player.buffer = newBuffer;
    this.player.connect(this.audioContext.destination);
    // this.setState({samples:this.player});
    // console.log(this.player);
    this.player.start();
  }

  render() {
    const samples = this.state.samples;
    return (
      <div style={{padding:15}} className="App">
        <div style={{padding:15}} onClick={this.startRecord}>Start recording</div>
        <div style={{padding:15}}onClick={this.stopRecord}>Stop recording</div>
        <div style={{padding:15}}onClick={this.play}>play</div>
      </div>
     
    );
  }
}


export default App;
