const Task = require('../models/Task');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const taskData = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        tags: req.body.tags,
        dueDate: req.body.dueDate,
    };

    try {
        const newTask = await new Task(taskData).save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body, editedAt: new Date() };

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
