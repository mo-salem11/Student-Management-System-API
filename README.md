# Student Management System API

This project provides a RESTful API for managing students, courses, and departments in an educational institution.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Add, update, delete, and retrieve students
- Add, update, delete, and retrieve courses
- Add, update, delete, and retrieve departments
- Search for students, courses, and departments by ID
- Retrieve all students belonging to a specific department

## Technologies Used
- Node.js
- HTTP module for creating the server
- fs (File System) module for reading and writing JSON data
- RESTful API design principles

## Installation
1. Clone this repository to your local machine.
2. Ensure you have Node.js installed.
3. Run `npm install` to install dependencies.

## Usage
1. Start the server by running `node server.js`.
2. Access the API endpoints using a tool like Postman or by sending HTTP requests from your application.

## Endpoints
- **Students**
  - `GET /students`: Get all students
  - `POST /students`: Add a new student
  - `GET /students/:departmentId`: Get all students belonging to a specific department
  - `PUT /students/:studentId`: Update a student
  - `DELETE /students/:studentId`: Delete a student
  - `GET /student/:studentId`: Search for a student by ID
- **Courses**
  - `GET /courses`: Get all courses
  - `POST /courses`: Add a new course
  - `PUT /courses/:courseId`: Update a course
  - `DELETE /courses/:courseId`: Delete a course
  - `GET /course/:courseId`: Search for a course by ID
- **Departments**
  - `GET /departments`: Get all departments
  - `POST /departments`: Add a new department
  - `PUT /departments/:departmentId`: Update a department
  - `DELETE /departments/:departmentId`: Delete a department
  - `GET /department/:departmentId`: Search for a department by ID

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

