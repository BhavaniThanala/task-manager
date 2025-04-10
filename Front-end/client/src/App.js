import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // We’ll style it next

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch tasks when the app loads
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add a task
  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.log(err));
    setTitle(''); // Clear input
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;