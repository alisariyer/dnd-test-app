import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
`;

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
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
                { ...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >{task.content}</Container>
        )}
    </Draggable>
  );
}
