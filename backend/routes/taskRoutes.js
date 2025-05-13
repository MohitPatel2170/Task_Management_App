const express = require('express');
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Define routes
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
