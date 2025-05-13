# Task Management and Prioritization App

## Overview

This project is a **task management application** designed to help users efficiently organize, prioritize, and track their tasks using a **Kanban board layout** and **task prioritization techniques**. Built with the MERN stack (MongoDB, Express, React, Node.js), this app provides an intuitive user interface and functionality to create, categorize, and manage tasks based on their priority and status.

---

## Features

1. **Kanban Board Interface**  
   - Visualize tasks in columns: "To Do," "In Progress," and "Done."
   - Drag and drop tasks between columns for seamless task tracking.

2. **Task Creation and Prioritization**  
   - Create tasks with:
     - Title
     - Description
     - Priority levels: urgent, important, normal
     - Tags for categorization
   - Prioritize tasks visually using a clean, intuitive interface.

3. **Daily and Weekly Review**  
   - View tasks completed over the past day or week.
   - Identify pending high-priority tasks for better alignment with goals.

4. **Responsive Design**  
   - Optimized for both desktop and mobile devices for on-the-go task management.

---

## Tech Stack

- **Frontend:** React, React-DnD (for drag-and-drop functionality)
- **Backend:** Node.js, Express
- **Database:** MongoDB (MongoDB Atlas for cloud hosting)
- **State Management:** Context API or Redux (optional)
- **Deployment:** Hosted on platforms like Netlify and Heroku

---

## Installation

### Prerequisites
Ensure the following are installed on your machine:
- Node.js
- npm (Node Package Manager)
- MongoDB (local or cloud-based like MongoDB Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies for both the frontend and backend
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    #Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. Configure Environement variables

  - Create a ```.env``` file in the ```backend``` folder and add the following:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the Application

    ```bash
    # Start the backend Server
    cd backend
    npm start

    # Start the frontend development server
    cd ../frontend
    npm start
    ```

5. Open your browser and navigate to ```http://localhost:3000``` to view the app.

---

## Usage

1. **Add New Tasks**
     - Click the "Add Task" button to open a form
     - Enter the task details, select a priority level, and assign tags

2. **Manage Tasks**
     - Drag and drop tasks across kanban board columns to update their status
     - Edit or delete tasks as needed
  
3. **Review Progress**
    - Navigate toe the "Review" section to see a summary of completed tasks and pending high-priority tasks"
  
---

## Deployment

### Backend Deployment (Heroku or Render)
1. Push the backend code to a repository
2. Deploy the backend using Heroku or Render
3. Set up environment variables in the deployment platform:
   - ```MONGO_URI``` Your MongoDB connection string

## Frontend Deployment (Netlify or Vercel)
1. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the ```build``` folder to netlify or vercel
3. Update the API URL in the frontedn to point to the deployed backend

---

## Future Enhancements

  - **User Authentication** Add secure login and multi-user support
  - **Collaborative Boards** Enable real-time collaboration on shared kanban boards
  - **Search and Filtering** Allow users to filter tasks by tags, priority, or status

---

## Weekly Reflection

At the end of each development week:
1. Document what you learned, challenges faced, and solutions implemented
2. Identify strengths and areas for improvement in you approach

---

## Contributing

1. Fork the repository
2. Create a new branch
   ```bash
   git checkout -b feature/your-name
   ```
3. Comit your changes
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or support, please reach out via [sjr.dev@protonmail.com].
