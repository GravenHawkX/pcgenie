// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Ensure the path is correct

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a task
router.post('/', async (req, res) => {
  const { text } = req.body;

  // Simple validation
  if (!text) {
    return res.status(400).json({ message: 'Text is required for a task' });
  }

  const task = new Task({
    text: req.body.text,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
