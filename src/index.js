import React, { useState } from "react";
import ReactDOM from "react-dom";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initialData";
import "normalize.css";

/**
 * react-beautiful-dnd has 3 major terms:
 * DragDropContext where we can move the object
 * Droppable where we can drop the object
 * Draggable is the object we want to drag and drop
 *
 */

const App = () => {
  const [data, setData] = useState(initialData);

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
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  }

  return (
    <DragDropContext
      // has 3 callbacks
      // onDragStart, onDragUpdate, onDragEnd
      onDragEnd={onDragEnd}
    >
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
