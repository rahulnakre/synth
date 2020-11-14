import React, { FC, useCallback, useState } from "react";
import { DragDropContext} from 'react-beautiful-dnd';
import DroppableAudioArea from "./DroppableAudioArea";

type BaseProps = {

}

type DraggableAudioState = {
  tasks: {
    [key: string]: {
      id: string,
      content: string,
    }
  };
  columns?: {
    [key: string]: {
      id: string,
      title: string,
      taskIds: string[]
    }
  };
  columnOrder?: string[];
}


const initialData: DraggableAudioState = {
  tasks: {
    "audio1": { id: "audio1", content: "audioWave1" },
    "audio2": { id: "audio2", content: "audioWave2" },
    "audio3": { id: "audio3", content: "audioWave3" },
    "audio4": { id: "audio4", content: "audioWave4" },
  }, 
  columns: {
    'col-1': {
      id: "col-1",
      title: 'guitar',
      // array so we can implement persistent reordering
      taskIds: ['audio1', 'audio2', 'audio3', 'audio4'],
    }
  },
  columnOrder: ['col-1']
}
/**
 * The Base of the main area where draggable and editable audio/midi 
 * tracks will go
 * @param props 
 */
const Base:FC<BaseProps> = (props) => {
  const [state, setState] = useState(initialData);

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
      {state.columnOrder?.map((colId: string) => {
        const column = state.columns![colId];
        const tasks = column.taskIds.map((taskId: string) => state.tasks[taskId]);
        return <DroppableAudioArea key={colId} column={column} tasks={tasks}/>;
      })}
    </DragDropContext>
  );

} 

export default Base;

