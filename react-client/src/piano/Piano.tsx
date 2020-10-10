import React, { useEffect, useState } from "react"
import styled, { StyledFunction } from "styled-components";
import * as AudioLogic from "../processor/audio_logic";


interface KeyProps {
  white?: boolean
}

const Key = styled.button<KeyProps>`
  background: ${props => props.white ? "palevioletred" : "white"};
  color: ${props => props.white ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em; 
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  width: 100px;
  height: 200px;
  display: flex;
  margin: auto;
`

export const Piano: React.FC = (props: any) => {
  // const [audioContext, setAudioContext] = useState<AudioContext>(
  //   new AudioContext()
  // );

  useEffect(() => {
    const audioCtx: AudioContext = new AudioContext();

    const startAudioMod = async () => {
      await AudioLogic.startAudioModule(audioCtx);
    }

    startAudioMod();

    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    }
  }, [])


  const onKeyPress = async () => {

  }

  return (
    <>
      <h1>sup {AudioLogic.add(1, 2)}</h1>
      <Key white onClick={onKeyPress}>
        C
      </Key>
    </>
  );
}