import React, { FC } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import useWindowSize from "../core/custom_hooks/useWindowSize";

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
    
}

const stopNote = (midiNumber: number) => {

}

const ResponsivePiano:FC<ResponsivePianoProps> = (props) => {
  const windowSize: WindowDimensions = useWindowSize();

  return (
    <div>
       <Piano
          // width={3000}
          noteRange={noteRange}
          width={windowSize.width}
          playNote={playNote}
          stopNote={stopNote}
          disabled={false}
          // width={1000}
          height={1000}
          keyboardShortcuts={keyboardShortcuts}
          //@ts-ignore
          // keyWidthToHeight={windowSize.width / windowSize.height}
        />
    </div>
  );
}

export default ResponsivePiano;