import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => 
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
        ? 'pink'
        : 'white'};
  };
  display: flex;
  column-gap: 5px;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 5px;
`

export default function Task({ task, index }) {
  const isDragDisabled = task.id === 'task-1';
  return (
    <Draggable 
      draggableId={task.id}
      index={index}
      // Optional: we can remove all make all disable 
      // isDragDisabled={task.id === 'task-1'}
      isDragDisabled={isDragDisabled}
    >
        {(provided, snapshot) => (
            /**
             * snapshot obj structure: 
             * const draggableSnapshot: { isDragging: true, 
             *          draggingOver: 'column-1' } // droppable id
             * const droppableSnapshot: { isDraggingOver: true,
             *          draggingOverWith: 'task-1' }
             */
            <Container
                { ...provided.draggableProps }
                // { ...provided.dragHandleProps} if we use handle transfer to child handle component
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                isDragDisabled={isDragDisabled}
            >
              {/* If you use handle instead of drag all item add this handle */}
              <Handle {...provided.dragHandleProps} />
              {task.content}</Container>
        )}
    </Draggable>
  );
}
