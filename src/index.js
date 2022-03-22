import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import initialData from './initialData';
import 'normalize.css';

const App = () => {
  const [data, setData] = useState(initialData);
  return (
    <>
      {data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks}/>
      })}
    </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

