# User Management API

A simple RESTful API built using Node.js and Express to manage users.
It supports basic CRUD operations along with search and sorting functionality.

---

## Setup & Run Instructions

1. Clone the repository
git clone https://github.com/vishnu25832/user-management-api.git
cd user-management-api

2. Install dependencies
npm install

3. Run the server
node index.js

4. Server runs on
http://localhost:3000

---

## API Endpoints

Create User
POST /users

Get All Users (with optional search & sort)
GET /users
GET /users?search=keyword
GET /users?sort=name&order=asc

Get User by ID
GET /users/:id

Update User
PUT /users/:id

Delete User
DELETE /users/:id

---

## Data Storage

This project uses in-memory storage:
- Data is temporary
- Data resets when the server restarts

---

## Assumptions / Notes

- Basic validation is implemented for required fields (name and email)
- Email format is validated using a simple check
- Proper HTTP status codes are returned (400, 404, etc.)
- No authentication is included as it was not required
- Designed to be simple and focused on assignment requirements

---

## Tech Stack

- Node.js
- Express.js

---

## Deployment

Live API:
https://user-management-api-fyb9.onrender.com

---

## Example Request (POST)

{
  "name": "Vishnu",
  "email": "vishnu@gmail.com"
}

---

## Example Response

{
  "id": 1,
  "name": "Vishnu",
  "email": "vishnu@gmail.com"
}

---
