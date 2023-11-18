// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        console.log('Tasks fetched successfully:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response || error.message || error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await axios.post('/tasks', { text: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
