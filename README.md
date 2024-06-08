# AlgoForces - An Online Judge Platform

Welcome to the AlgoForces! This project is a web-based system that allows users to practice coding by solving problems, submitting solutions, and receiving immediate feedback.

## Table of Contents
- [Screenshots](#screenshots-of-the-website)
- [Demo Video](#demo-video)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Screenshots of the Website
![Home Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/xdjyw7mxegrcboth3k42.png)
*Home Page*

![Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/qdjfrneb8uurqysj8k4v.png)

![Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/xpmim1rosaztcvhdi8rx.png)
*Problem Page*

## Demo Video

[Watch the demo video](https://www.loom.com/share/10678c1fff49486d9a2d6460cc91071e?sid=94fd7034-fb5c-4fd4-9a3c-1870aa323a0c)

*Click the link to watch the demo video*

## Features
- User Authentication
  - Sign Up
  - Login
  - Logout
- Problem Management
  - Add/Edit/Delete Problems
  - List Problems
  - View Problem Details
- Code Submission and Evaluation
  - Support for multiple languages (C, C++, Java, Python)
  - Code Compilation
  - Code Execution
  - Test Case Validation
- User Dashboard
  - View Submitted Solutions
  - View Submission Status (Passed/Failed)
- Notifications
  - Success and Error Messages

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your local machine:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (Optional, for running the judge in a containerized environment)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/online-judge.git
    cd online-judge
    ```

2. **Install backend dependencies**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Install compiler dependencies**
    ```bash
    cd ../compiler
    npm install
    ```

5. **Set up environment variables**
    Create a `.env` file in the `backend` directory and add your configuration details:
    ```env
    PORT=3000
    MONGODB_URI=
    FRONTEND_URL=http://localhost:5173
    COMPILER_URL=http://localhost:5000

    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    RESET_PASSWORD_TOKEN_SECRET=

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    EMAIL= 
    PASSWORD= 
    ```

6. **Set up environment variables**
    Create a `.env` file in the `frontend` directory and add your configuration details:
    ```env
    VITE_BACKEND_URL = http://localhost:3000
    ```

7. **Start the backend server**
    ```bash
    cd backend
    npm start
    ```

8. **Start the frontend server**
    ```bash
    cd ../frontend
    npm start
    ```

9. **Start the compiler server**
    ```bash
    cd ../compiler
    npm start
    ```

## Usage

Once the installation is complete, you can start using the platform by navigating to `http://localhost:5173` in your web browser.

- **Sign Up**: Create a new account.
- **Login**: Login to your account.
- **Submit Code**: Choose a problem, write your solution in the editor, and submit it for evaluation.
- **View Results**: Check the results of your submissions in the verdict.

## Project Structure

```plaintext
online-judge/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utilities/
│   ├── middlewares/
│   ├── .env
│   ├── app.js
│   ├── database.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── compiler/
│   ├── index.js
│   ├── executeCpp.js
│   ├── executeC.js
│   ├── executePython.js
│   ├── executeJave.js
│   └── package.json
└── README.md
