import React, { useEffect, useState } from  "react"
import styled from "styled-components";
import { useKeyPress } from "../core/custom_hooks/useKeyPress";
// import { useMultiKeyPress } from "../core/custom_hooks/useMultiKeyPress"
import * as AudioLogic from "../audio_logic/audio_logic";


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
// interface LabelProps {
//   bold?: boolean
// }

// const Label = styled.h3<LabelProps>`
//   font-weight: ${props => props.bold ? "normal" : "bold"}
// `

export const Piano: React.FC = (props: any) => {
  // const [audioContext, setAudioContext] = useState<AudioContext>(
  //   new AudioContext()
  // );
  const cPress: boolean = useKeyPress("c");
  const aPress: boolean = useKeyPress("a");
  // const keysPressed = useMultiKeyPress();
  const [workletNode, setWorkletNode] = useState<AudioWorkletNode>();
  // console.log(workletNode);

  useEffect(() => {
    const audioCtx: AudioContext = new AudioContext();

    if (audioCtx.audioWorklet === undefined) { 
      console.log("audio worklet is not supported");
      return;
    }

    const startAudioMod = async () => {
      try {
        setWorkletNode(await AudioLogic.startAudioModule(audioCtx));
      } catch (err) {
        console.log("[startAudioMod] " + err)
      }    
    }

    startAudioMod();

    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    }
  }, [])

  // trigger wasm stuff when key pressed
  useEffect(() => {
    console.log("trigger something");
    // workletNode.use
    AudioLogic.onKeyPress("c")
    if (cPress) {

    }

  }, [cPress, aPress])


  const onButtonClick = async () => {
    console.log("pressing c: " + cPress);
  }

  return (
    <>
      <h1>sup {AudioLogic.add(1, 2)}</h1>
      <div style={{ display: "flex"}}>
        <Key white onClick={onButtonClick}>
         <h3 style={{color: cPress ? "black" : "white"}}>C</h3> 
        </Key>
        <Key white onClick={onButtonClick}>
          <h3 style={{color: aPress ? "black" : "white"}}>A</h3> 
        </Key>
      </div>
    </>
  );
}
