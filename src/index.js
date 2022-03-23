import React, { useState } from "react";
import ReactDOM from "react-dom";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from 'styled-components';
import initialData from "./initialData";
import "normalize.css";

/**
 * react-beautiful-dnd has 3 major terms:
 * DragDropContext where we can move the object
 * Droppable where we can drop the object
 * Draggable is the object we want to drag and drop
 *
 */

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [data, setData] = useState(initialData);

  // const onDragStart = () => {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'background-color .5s ease-in-out';
  // }

  // const onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0;
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // }

  /**
   * result give an object like this:
   * {
   *    draggableId: 'task-1',
   *    type: 'TYPE',
   *    reason: 'DROP',
   *    source: {
   *      droppableId: 'column-1',
   *      index: 0,
   *    },
   *    destination: {
   *      droppableId: 'column-1',
   *      index: 1,
   *    }
   * }
   *
   * Note: Some cases destination can be null as drop outside
   *
   */

  const onDragEnd = (result) => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // const column = data.columns[source.droppableId];

    // Previously we use one column because there is only one column
    // but now we use source and destination so we change logic here

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
  
      console.log(newColumn)
  
      setData(prevData => {
        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [newColumn.id]: newColumn,
          }
        }
      })
    } else {
      // Moving from one list to another
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setData(prevData => {
        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          }
        }
      })
    }

  }

  return (
    <DragDropContext
      // has 3 callbacks
      // onDragStart, onDragUpdate, onDragEnd
      // onDragStart={onDragStart}
      // onDragUpdate={onDragUpdate}

      /**
       *  const start = {
       *    draggableId: 'task-1',
       *    type: 'TYPE',
       *    source: {
       *      droppableId: 'column-1',
       *      index: 0,
       *    },
       *  };
       * 
       *  const update = {
       *    ...start,
       *    destination: {
       *      droppableId: 'column-1',
       *      index: 1,
       *    },
       * };
       * 
       *  const result = {
       *    ...update,
       *    reason: 'DROP',
       *  };
       */
      onDragEnd={onDragEnd}
    >
      <Container>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
