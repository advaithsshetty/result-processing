# Exam Result Processing System

## Overview

This project provides a solution for processing and displaying student exam results. The system allows you to manage student data, calculate their average scores, rank them, and generate reports. It also includes a fast search functionality using a **Binary Search Tree (BST)** to allow quick lookups of student data.

## Features

- **Student Management**: Add, update, delete, and retrieve student information (ID, name, and exam scores).
- **Sorting and Ranking**: Sort students by their average scores and rank them accordingly.
- **Fast Search**: Use a Binary Search Tree (BST) for quick search of student records by ID.
- **Report Generation**:
  - Full report of all students with their scores and ranks.
  - Top N students based on average score.
  - Students whose average score is below a given threshold.
  - Average scores for each subject across all students.

## Problem

Processing and displaying exam results for students is a challenge, especially when handling large datasets. The solution must:

1. Efficiently store student information (ID, name, and exam scores).
2. Sort and rank students based on their performance.
3. Allow fast searches for specific student data.

## Solution

This system addresses the problem by:

1. Using **MongoDB** to store student data in a NoSQL database.
2. Sorting students based on their average exam scores and ranking them.
3. Implementing a **Binary Search Tree (BST)** to allow fast searching of student records.
4. Generating various reports to analyze student performance.

## Technologies Used

- **Node.js**: The server-side JavaScript runtime used for building the backend.
- **Express.js**: Web framework used to handle routing and HTTP requests.
- **MongoDB**: NoSQL database used to store student data.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **JWT (JSON Web Tokens)**: Used for secure authentication.
- **bcryptjs**: For hashing passwords securely.

## Setup

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [MongoDB](https://www.mongodb.com/) (or use a cloud MongoDB service like MongoDB Atlas)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/advaithsshetty/result-processing.git
   cd result-processing
   ```

2. **Install dependencies**:

   ```bash
   npm i
   ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=5000
   MONGO_URI=<your_mongodb_uri_here>
   SECRET_KEY=your_secret_key_here
   ```

   - `PORT`: The port where the server will run.
   - `MONGO_URI`: MongoDB URI (you can use your local MongoDB instance or a cloud service like MongoDB Atlas).
   - `SECRET_KEY`: A secret key for JWT authentication.

4. **Run the server**:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:<PORT>`.

## API Endpoints

### Authentication

- **POST** `/auth/signup`: Register a new user.

  - Request body: `{ "username": "your_username", "password": "your_password" }`
  - Response: `{ "message": "User registered successfully." }`

- **POST** `/auth/login`: Login and get a JWT token.
  - Request body: `{ "username": "your_username", "password": "your_password" }`
  - Response: `{ "message": "Login successful.", "token": "jwt_token_here" }`

### Student Management

- **POST** `/students`: Add a new student.

  - Request body: `{ "id": 123, "name": "John Doe", "scores": [{"subject": "Math", "score": 90}, {"subject": "Science", "score": 85}] }`
  - Response: `{ "message": "Student added successfully." }`

- **GET** `/students`: Get all students, sorted by their average score.

  - Response: List of students with rank, name, average score, and individual scores.

- **GET** `/students/:id`: Get details of a specific student by ID.

  - Response: `{ "id": 123, "name": "John Doe", "scores": [{"subject": "Math", "score": 90}, {"subject": "Science", "score": 85}] }`

- **PUT** `/students/:id`: Update an existing student's details.

  - Request body: `{ "name": "John Doe", "scores": [{"subject": "Math", "score": 95}, {"subject": "Science", "score": 88}] }`
  - Response: `{ "message": "Student updated successfully." }`

- **DELETE** `/students/:id`: Delete a student by ID.
  - Response: `{ "message": "Student deleted successfully." }`

### Report Generation

- **GET** `/report`: Get a full report of all students, sorted by average score.

  - Response: A list of all students, including their rank, name, average score, and individual scores.

- **GET** `/report/top/:n`: Get the top N students by average score.

  - Response: A list of the top N students with their rank and scores.

- **GET** `/report/below/:threshold`: Get students whose average score is below a given threshold.

  - Response: A list of students below the specified threshold.

- **GET** `/report/subject-averages`: Get the average score for each subject across all students.
  - Response: A list of subjects with their average scores.

## Authentication and Authorization

The system uses **JWT (JSON Web Tokens)** for user authentication. To access protected routes (such as managing students and generating reports), a user must first **login** to obtain a JWT token, which should be included in the `Authorization` header as `Bearer <token>` for subsequent requests.

## Example Workflow

1. **User Signup/Login**:

   - The user first registers by providing a username and password.
   - After successful registration, the user logs in to receive a JWT token.

2. **Student Management**:

   - The authenticated user can add, update, or delete students using the respective API routes.

3. **Report Generation**:
   - The user can generate reports on students based on performance, top students, and subject averages.

## Code Structure

```
/server.js           - Entry point of the application, sets up Express server and routes.
models/
  - Student.js        - Mongoose model for student data.
  - User.js           - Mongoose model for user authentication.
middleware/
  - auth.js           - Middleware for verifying JWT tokens.
routes/
  - auth.js           - Routes for user authentication (signup, login).
  - students.js       - Routes for managing students (CRUD operations).
  - report.js         - Routes for generating various reports.
utils/
  - helpers.js        - Utility functions for sorting and ranking students.
```

## Acknowledgments

- **MongoDB**: For providing an easy-to-use, scalable NoSQL database.
- **Express.js**: A fast and minimalist web framework for Node.js.
- **JWT (JSON Web Token)**: For secure and stateless user authentication.
- **bcryptjs**: For hashing passwords securely.

---

Feel free to contribute to this project by opening issues or submitting pull requests. If you have any questions or suggestions, feel free to reach out!
