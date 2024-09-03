# AlgoForces - An Online Judge Platform

Welcome to the AlgoForces! This project is a web-based system that allows users to practice coding by solving problems, submitting solutions, and receiving immediate feedback.

## Table of Contents
- [Screenshots](#screenshots-of-the-website)
- [Demo Video](#demo-video)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Screenshots of the Website
![Home Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/xdjyw7mxegrcboth3k42.png)
*Home Page*

![Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/qdjfrneb8uurqysj8k4v.png)

![Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/xpmim1rosaztcvhdi8rx.png)
*Problem Page*

![Profile Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/rvhrvqztzgtq0u9mzszj.png)
*Profile Page*

![Admin Panel](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879687/MyStorage/hpoyyi9rhof07j3marp5.png)
*Admin Panel*

![Submissions Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879686/MyStorage/tqtxygk2nb2bde284g6n.png)
*Submisssions Page*

![Testcase Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879686/MyStorage/bm9pvemgn2jw60mxpnfw.png)
*Testcase Page*

![Edit Problem Page](https://res.cloudinary.com/dftyqcjar/image/upload/v1717879686/MyStorage/vn1h5ucv34fov1xgkmnf.png)
*Edit Problem Page*

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
- Notifications
  - Success and Error Messages
- Profile Page
  - User Details
  - Profile Photo
  - Heatmap of submissions
- Admin Panel
  - For user promotion to admin or demotion to user

## Technologies Used

![Node.js](https://nodejs.org/static/images/logo.svg)
- Node.js

![Express.js](https://expressjs.com/images/express-facebook-share.png)
- Express.js

![MongoDB](https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png)
- MongoDB

![React.js](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)
- React.js

![Cloudinary](https://res.cloudinary.com/cloudinary/image/upload/new_cloudinary_logo_square.png)
- Cloudinary

![Docker](https://pbs.twimg.com/profile_images/1749553035133566976/hMA0FbDk_400x400.jpg)
- Docker

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
│   ├── executeJave.js
│   └── package.json
└── README.md
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Md Kamran - akhtarkamran2004@gmail.com

Project Link: [https://github.com/Coder2264/Online-Judge-Project](https://github.com/Coder2264/Online-Judge-Project)

## Acknowledgements

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
