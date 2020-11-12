import React, { FC, useEffect, useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import useWindowSize from "../core/custom_hooks/useWindowSize";
import * as AudioLogic from "../audio_logic/audio_logic";

type ResponsivePianoProps = {

}

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const playNote = (midiNumber: number) => {
  console.log(midiNumber);

   AudioLogic.onKeyPress(midiNumber);
}

const stopNote = (midiNumber: number) => {

}

const ResponsivePiano:FC<ResponsivePianoProps> = (props) => {
  const windowSize: WindowDimensions = useWindowSize();
  const [workletNode, setWorkletNode] = useState<AudioWorkletNode>();
  
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
  }, []);
  
  return (
    <div>
       <Piano
          noteRange={noteRange}
          width={windowSize.width}
          playNote={playNote}
          stopNote={stopNote}
          disabled={false}
          height={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
    </div>
  );
}

export default ResponsivePiano;