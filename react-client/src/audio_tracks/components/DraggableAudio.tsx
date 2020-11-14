import React, { FC, useState } from "react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import styled from "styled-components";
import { getAllJSDocTagsOfKind } from "typescript";

type DraggableAudioProps = {
  // data?: any;
  key: string;
  task: {
    id: string;
    content: string;
  };
  index: number;
} 

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

/**
 * The draggable waveform/midi that will live inside DroppableAudioArea's
 * @param props 
 */
const DraggableAudio:FC<DraggableAudioProps> = (props) => {
  
  return (
      <Draggable
        key={props.key}
        draggableId={props.task.id} 
        index={props.index}
      >
        {(provided, snapshot) => (
          // <Container>

          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={getItemStyle(
            //   snapshot.isDragging,
            //   provided.draggableProps.style
            // )}
          >
            <h4>{props.task.content}</h4>
          </Container>
                  // </Container>

        )}

      </Draggable>
    // </Container>
  );
}

export default DraggableAudio