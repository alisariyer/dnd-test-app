import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import 'normalize.css';

/**
 * react-beautiful-dnd has 3 major terms:
 * DragDropContext where we can move the object
 * Droppable where we can drop the object
 * Draggable is the object we want to drag and drop
 * 
 */

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = () => {
    // TODO
  }

  return (
    <DragDropContext
      // has 3 callbacks
      // onDragStart, onDragUpdate, onDragEnd
      onDragEnd={onDragEnd}
    >
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks}/>
      })}
    </DragDropContext>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

