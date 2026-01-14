# Engineering Blog App 

The **Engineering Blog App** is a full-stack web application designed for engineering students and developers to read, write, and manage technical blog posts related to programming, AI/ML, web development, and core engineering subjects.

The project follows a **clean frontend–backend separation** and uses a local database setup for development. It is built with scalability in mind, allowing future integration of intelligent features such as **machine learning–based blog recommendations**.



# Features

- Create, read, update, and delete (CRUD) blog posts
- Clean and responsive user interface
- RESTful backend architecture
- Local database integration for development
- Separate frontend and backend codebase
- Scalable structure for future enhancements

---

# Tech Stack

#  Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB (Local)
- MongoDB Compass (GUI for database management)

---

## 🗄️ Database Setup (Local MongoDB)

This project uses **MongoDB running locally** for development purposes.

- MongoDB is hosted on the local machine
- **MongoDB Compass** is used to visualize, manage, and query the database
- Backend connects to MongoDB using a local connection string
- start mongodb : net start MongoDB
- stop mongodb : net stop MongoDB


Example connection:

MONGO_URI=mongodb://127.0.0.1:27017/engineering_blog_app
