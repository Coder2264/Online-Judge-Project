# AlgoForces - An Online Judge Platform

AlgoForces is an **online-judge platform** that allows users to practice data structures and algorithms by solving problems, submitting solutions, and receiving immediate feedback.


---

## 🖼️ Architecture Overview

This system is an **Online Judge** platform designed for scalable, secure, and efficient execution of user code submissions.

![Architecture Diagram](https://res.cloudinary.com/dcij8s42h/image/upload/v1757482737/Screenshot_2025-09-10_at_11.07.30_AM_sx9zzb.png)

---

## 🔹 Components

* **API Gateway**

  * Entry point for all user requests.
  * Handles authentication, routing, and rate-limiting.

* **User Service**

  * Manages user accounts, profiles, and photos.
  * Stores data in **User DB** and **Photo DB**.

* **Problem Service**

  * Provides problem statements, public testcases and metadata.
  * Fetches data from **Problem DB** with a **Cache (Redis)** layer for fast access.

* **Submission Service**

  * Handles new submissions (`/submit`).
  * Persists submissions in **Submission DB**.
  * Submissions are queued for compilation via **SQS (Queue)**.

* **Compiler Service**

  * Consumes jobs from **SQS**.
  * Dispatches code to **Isolated Workers** (Docker containers) for secure execution.
  * Fetches problem/testcase metadata from **Cache → DBs**.
  * Stores execution results back in **Submission DB**.

* **Isolated Workers (Autoscaled Pool)**

  * Sandbox environments (Docker) for secure, language-specific code execution.
  * Scaled dynamically based on load.

* **Databases**

  * **User DB** – user data.
  * **Photo DB** – user profile photos.
  * **Problem DB** – problem statements and metadata.
  * **Testcases DB** – hidden input/output test cases.
  * **Submission DB** – stores submissions and results.

---

## 🔹 Request Lifecycle

1. **User submits code** (`/submit`) → handled by **Submission Service** → stored in **Submission DB**.
2. **Submission Service** sends job to **SQS** → **Compiler Service** picks it up.
3. **Compiler Service** fetches problem/testcases (via **Cache → DBs**).
4. **Compiler Service** dispatches the job to an **Isolated Worker**.
5. **Isolated Worker** runs the code securely, compares output against testcases, measures time and memory per testcase.
6. Execution results are returned to **Compiler Service**.
7. Results are saved in **Submission DB**.
8. User retrieves results by polling (`/submission/:id`) or via UI refresh.

---

## 🔹 Key Features

* ✅ Secure sandboxing (Docker-based Isolated Workers)
* ✅ Asynchronous processing with **SQS**
* ✅ Scalable compilation/execution pool (autoscaling workers)
* ✅ Caching layer (Redis) for performance
* ✅ Clean separation of services (microservices)

---

## Screenshots of the Website

### Home Page
![Home Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/xdjyw7mxegrcboth3k42.png)

### Problem Page
![Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/qdjfrneb8uurqysj8k4v.png)

![Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/xpmim1rosaztcvhdi8rx.png)

### Profile Page
![Profile Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/rvhrvqztzgtq0u9mzszj.png)

### Admin Panel
![Admin Panel](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/hpoyyi9rhof07j3marp5.png)

### Submisssions Page
![Submissions Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879686/MyStorage/tqtxygk2nb2bde284g6n.png)

### Testcase Page
![Testcase Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879686/MyStorage/bm9pvemgn2jw60mxpnfw.png)

### Edit Problem Page
![Edit Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879686/MyStorage/vn1h5ucv34fov1xgkmnf.png)


## Demo Video

[Watch the demo video](https://www.loom.com/share/10678c1fff49486d9a2d6460cc91071e?sid=94fd7034-fb5c-4fd4-9a3c-1870aa323a0c)

*Click the link to watch the demo video*

## Features
- User Authentication
  - Sign Up
  - Login
  - Logout
  - Forgot Password
- User Authorization
  - Two types of Users- Admin and User
  - Different rendering for each type
- Problem Management
  - Add/Edit/Delete Problems
  - List Problems
  - View Problem Details
- Code Submission and Evaluation
  - Support for multiple languages (C, C++, Java, Python)
  - Code Compilation
  - Code Execution
  - Test Case Validation
- Submission Verdict
  - View Submitted Solutions
  - View Submission Status (Passed/Failed)
- Profile Page
  - User Details
  - Profile Photo
  - Heatmap of submissions
- Admin Panel
  - For user promotion to admin or demotion to user


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your local machine:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
  
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
- **See stats**: Check the number and distributions of problems solved.


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
│   │   ├── App.jsx
│   │   ├── Axios.js
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── compiler/
│   ├── index.js
│   ├── executeCpp.js
│   ├── executeC.js
│   ├── executePython.js
│   ├── executeJava.js
│   └── package.json
└── README.md
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
