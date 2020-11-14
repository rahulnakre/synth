import React, { FC } from "react";
import { Draggable, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";
import { getPreEmitDiagnostics } from "typescript";
import DraggableAudio from "./DraggableAudio";

type DroppableAudioAreaProps = {
  key: string;
  data?: any;
  tasks: {
    id: string;
    content: string;
  }[];
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

// type AudioDroppables = "audioDroppables";

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: 8,
  overflow: 'auto'
});

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const AudioList = styled.div`
  padding: 8px; 
`;


/**
 * The container in which things can be dragged and dropped into.
 * This is where Audio waveforms and MIDI tracks will be living inside as 
 * Draggables
 * @param props 
 */
const DroppableAudioArea:FC<DroppableAudioAreaProps> = (props) => {
  return (
    <Container>
      <Title>List</Title>
      <Droppable 
        droppableId={props.key} 
        type="audioDroppable"
        // direction="horizontal"
      >
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <AudioList
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
              {props.tasks.map((task, index) => (
                // <AudioList>
                  <DraggableAudio key={task.id} task={task} index={index}/>
                // </AudioList>
              ))}
            {provided.placeholder}
          </AudioList>
        )}
      </Droppable>
    </Container>
  );
}

export default DroppableAudioArea;