import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

type DraggableAudioProps = {

} 

/**
 * The draggable waveform/midi that will live inside DroppableAudioArea's
 * @param props 
 */
const DraggableAudio:FC<DraggableAudioProps> = (props) => {
  return (
    <Draggable draggableId="draggable-1" index={0}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>My draggable</h4>
        </div>
      )}
    </Draggable>
  );
}

export default DraggableAudio