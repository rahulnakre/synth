import React, { FC, useCallback } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


type BaseProps = {

}

/**
 * The Base of the main area where draggable and editable audio/midi 
 * tracks will go
 * @param props 
 */
const Base:FC<BaseProps> = (props) => {

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  return (
    // Context for the main panel
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      {props.children}
    </DragDropContext>
  );

} 

export default Base;

