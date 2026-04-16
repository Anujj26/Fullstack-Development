# EduFeedback – Student Feedback Review System

EduFeedback is a simple, modern college feedback platform. It allows students to submit ratings and reviews for their courses, and gives administrators an easy-to-use dashboard to view these analytics.

---

## Overview

This project simulates a university feedback system. Students can securely log in and submit ratings on Teaching Quality, Course Content, and Infrastructure. Administrators can view graphical trends and manage these feedbacks.

---

## Core Functionalities

### For Students
* Register and log in securely.
* Select a course and submit feedback using a 5-star rating system.
* View and manage previously submitted feedback.

### For Admins
* View a real-time graphical dashboard of average ratings per course.
* See a feed of all student feedbacks.
* Add new courses or delete inappropriate feedback.

---

## Project Structure

```text
Assignment 7/
├── backend/                  
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   └── server.js            # Backend entry point
│
└── frontend/                
    └── src/                 
        ├── components/      # Reusable UI pieces
        └── pages/           # Pages (Login, Dashboards, Feedback Form)
```

---

## Setup Instructions

### Prerequisites
* Node.js
* MongoDB running locally (default: `mongodb://localhost:27017`)

### 1. Backend Setup
Open a terminal in the `backend` directory:
```bash
cd backend
npm install
node server.js
```

### 2. Frontend Setup
Open a second terminal in the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
Then, open `http://localhost:5173` in your browser.

---

## Available Features (API)

* **Authentication:** Signup and login for Students and Admins.
* **Courses:** View courses, and allow Admins to create or delete them.
* **Feedback:** Submit ratings, view student history, and check Admin analytics.

---

## Summary

EduFeedback demonstrates a complete web application with a modern design. It's built cleanly, ensuring a smooth experience for both students submitting reviews and administrators analyzing them.
