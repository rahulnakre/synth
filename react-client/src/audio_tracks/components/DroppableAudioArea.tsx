import React, { FC } from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";

type DroppableAudioAreaProps = {

}

// type AudioDroppables = "audioDroppables";

/**
 * The container in which things can be dragged and dropped into.
 * This is where Audio waveforms and MIDI tracks will be living inside as 
 * Draggables
 * @param props 
 */
const DroppableAudioArea:FC<DroppableAudioAreaProps> = (props) => {
  return (
    <Droppable droppableId="droppableAudioArea" type="audioDroppable">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey"}}
          {...provided.droppableProps}
        >
          <h2>im droppable</h2>
          {provided.placeholder}
          {props.children}
        </div>
      )}
    </Droppable>
  );
}

export default DroppableAudioArea;