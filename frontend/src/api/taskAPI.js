import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Helper function for error handling
const handleError = (error, message) => {
    console.error(`${message}:`, error);
    throw error;
};

// Fetch all tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        handleError(error, 'Error fetching tasks');
    }
};

// Create a new task
export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData);
        return response.data;
    } catch (error) {
        handleError(error, 'Error creating task');
    }
};

// Update a task
export const updateTask = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        handleError(error, 'Error updating task');
    }
};

// Delete a task
export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, 'Error deleting task');
    }
};
