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
`;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
 ) => ({
  // @ts-ignore
  // userSelect: "none",
  padding: 16,
  margin: "0 0 8px 0",
  background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle
});

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
          <Container>

          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={getItemStyle(
            //   snapshot.isDragging,
            //   provided.draggableProps.style
            // )}
          >
            <h4>{props.task.content}</h4>
          </div>
          </Container>

        )}

      </Draggable>
    // </Container>
  );
}

export default DraggableAudio