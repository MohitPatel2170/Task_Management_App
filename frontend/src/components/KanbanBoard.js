import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faFlag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../components/Kanban.css';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskColumn, setNewTaskColumn] = useState(null); // Track which column is creating a task

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleCreateTask = async (status, taskData) => {
        try {
            await createTask({ ...taskData, status });
            fetchTasks();
            setNewTaskColumn(null); // Reset task creation state
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleMoveTask = async (id, newStatus) => {
        try {
            await updateTask(id, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error('Error moving task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdateTask = async (id, updatedData) => {
        try {
            await updateTask(id, updatedData);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board-container">
                <h1 className="kanban-title">My Kanban Board</h1>
                <div className="kanban-board">
                    {['todo', 'inprogress', 'done'].map((status) => (
                        <KanbanColumn
                            key={status}
                            status={status}
                            tasks={tasks.filter((task) => task.status === status)}
                            onMoveTask={handleMoveTask}
                            onDelete={handleDeleteTask}
                            onCreateTask={handleCreateTask}
                            onUpdateTask={handleUpdateTask}
                            isCreating={newTaskColumn === status}
                            setCreating={() => setNewTaskColumn(status)}
                        />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

const KanbanColumn = ({
    status,
    tasks,
    onMoveTask,
    onDelete,
    onCreateTask,
    onUpdateTask,
    isCreating,
    setCreating,
}) => {
    const [, drop] = useDrop({
        accept: 'task',
        drop: (item) => onMoveTask(item.id, status),
    });

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        priority: 'normal',
        tags: '',
        dueDate: '',
    });

    const handleAddTask = () => {
        if (taskData.title.trim()) {
            onCreateTask(status, {
                ...taskData,
                tags: taskData.tags.split(',').map((tag) => tag.trim()), // Split tags
            });
            setTaskData({ title: '', description: '', priority: 'normal', tags: '', dueDate: '' });
        }
    };

    return (
        <div ref={drop} className={`kanban-column ${status}`}>
            <h2 className="kanban-column-title">{status.toUpperCase()}</h2>
            {!isCreating && (
                <button className="add-task-button-inline" onClick={setCreating}>
                    + Add Task
                </button>
            )}
            {isCreating && (
                <div className="new-task-form">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskData.title}
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        className="task-input"
                    />
                    <textarea
                        placeholder="Task Description"
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        className="task-input"
                    />
                    <select
                        value={taskData.priority}
                        onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                        className="task-select"
                    >
                        <option value="normal">Normal</option>
                        <option value="important">Important</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    <input
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                        className="task-input"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma-separated)"
                        value={taskData.tags}
                        onChange={(e) => setTaskData({ ...taskData, tags: e.target.value })}
                        className="task-input"
                    />
                    <div className="task-form-buttons">
                        <button className="add-task-button" onClick={handleAddTask}>
                            Add
                        </button>
                        <button className="cancel-task-button" onClick={() => setCreating(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div className="task-list">
                {tasks.map((task) => (
                    <KanbanCard
                        key={task._id}
                        task={task}
                        onDelete={onDelete}
                        onUpdate={onUpdateTask}
                    />
                ))}
            </div>
        </div>
    );
};

const KanbanCard = ({ task, onDelete, onUpdate }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleSaveEdit = () => {
        const updatedTags =
            Array.isArray(editedTask.tags)
                ? editedTask.tags
                : editedTask.tags.split(',').map((tag) => tag.trim());

        onUpdate(task._id, {
            ...editedTask,
            tags: updatedTags,
        });
        setIsEditing(false);
    };

    return (
        <div
            ref={drag}
            className={`kanban-card ${task.priority}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {isEditing ? (
                <div className="kanban-card-edit">
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        className="task-input"
                    />
                    <textarea
                        value={editedTask.description}
                        onChange={(e) =>
                            setEditedTask({ ...editedTask, description: e.target.value })
                        }
                        className="task-input"
                    />
                    <button onClick={handleSaveEdit} className="add-task-button">
                        Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="cancel-task-button">
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <div className="kanban-card-header">
                        <h3 className="kanban-card-title">{task.title}</h3>
                    </div>
                    <div className="kanban-card-body">
                        <p><strong>Description:</strong> {task.description || 'No description'}</p>
                        {task.dueDate && (
                            <p>
                                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        )}
                        <p>
                            <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
                        </p>
                        {task.editedAt && (
                            <p>
                                <strong>Last Edited:</strong> {new Date(task.editedAt).toLocaleString()}
                            </p>
                        )}
                        {task.tags?.length > 0 && (
                            <div className="kanban-card-tags">
                                {task.tags.map((tag, index) => (
                                    <span key={index} className="kanban-card-tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="kanban-card-actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(task._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};



export default KanbanBoard;
