import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../Axios";

function ProfilePage() {

    let handle = localStorage.getItem('handle');
    const navigate = useNavigate();

    const [data, setData] = useState({
        fullName: "",
        email: "",
        dob: "",
        problemsSolved: 0,
        problemsAttempted: 0,
        userType: ""
    });

    useEffect(() => {
        const isLoggedIn = async () => {
          try {
            const response = await axiosInstance.post("/users/isloggedin");
            console.log(response);
          } catch (error) {
            console.log(error);
            navigate('/');
          }
        };
        isLoggedIn();
      }, []);

    const handleImageUpload = (event) => {
        console.log("tried to upload image");
    };

    const handleUpdate = () => {
        console.log("tried to update");
    };

    return (
        <>
    <Navbar />
    <div className="flex flex-col md:flex-row items-start p-4 md:p-10 bg-gray-100">
        <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/4">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="w-full h-auto rounded-full shadow-lg" />
            <input type="file" onChange={handleImageUpload} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md" />
            <button onClick={handleUpdate} className="mt-2 w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update</button>
        </div>
        <div className="w-full md:w-3/4">
            <div className="text-2xl md:text-5xl font-bold mb-4">{data.fullName}</div>
            <div className="text-lg md:text-xl mb-2">Email: {data.email}</div>
            <div className="text-lg md:text-xl mb-2">Date of Birth: {data.dob}</div>
            <div className="text-lg md:text-xl mb-2">Problems Solved: {data.problemsSolved}</div>
            <div className="text-lg md:text-xl mb-2">Problems Attempted: {data.problemsAttempted}</div>
            <div className="text-lg md:text-xl mb-2">User Type: {data.userType}</div>
        </div>
    </div>
    <Footer />
</>
    )
}

export default ProfilePage;