import React, { Component } from 'react';
import './App.css';
const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioContext = new AudioContext();

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
          this.samples = this.samples.concat(samples);
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
    this.setState({samples:this.samples});
  }

  render() {
    const samples = this.state.samples;
    return (
      <div style={{padding:10}} className="App">
        <div style={{padding:10}} onClick={this.startRecord}>Start recording</div>
        <div style={{padding:10}}onClick={this.stopRecord}>Stop recording</div>
        <div> nr of samples for 2048 {this.state.samples.length}</div>
        <div>{JSON.stringify(samples[samples.length-1])}</div>
      </div>
     
    );
  }
}


export default App;
