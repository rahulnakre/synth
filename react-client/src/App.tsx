import React from 'react';
import styled from 'styled-components';
import './App.css';
import AudioCanvas from './audio_tracks/pages/AudioCanvas';
// import { Piano } from './piano/Piano';
import ResponsivePiano from './piano/ResponsivePiano';

const PianoContainer = styled.div`
  position: fixed; 
  width: 100%;
  bottom: 0;
`

function App() {
  
  return (
    <div>
      <AudioCanvas />
      <PianoContainer>
        <ResponsivePiano />
      </PianoContainer>
      {/* <Piano /> */}
    </div>
  );  
}

export default App;
