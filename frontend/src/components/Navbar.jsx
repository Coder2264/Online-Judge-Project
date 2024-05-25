import logo from '../assets/logo.png';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Navbar() {

    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3000/api/v1',
      })

    const navigate=useNavigate();

    let handle=localStorage.getItem('handle');

    const userHandler = () => {
        navigate("/profile");
    }

    const logOutHandler = async () => {
  try {
    await instance.post("/users/logout");
    localStorage.clear();
    navigate("/");
  } catch (error) {
    console.error('Failed to log out:', error);
  }

}

const HomePageHandler = () => {
    navigate("/home");
  }

  return (
    <nav className="mt-0 mb-0 flex justify-between bg-blue-500 text-white w-full p-4">
        <div className="flex items-center">
            <img src={logo} alt="logo" className="h-10 w-10"/>
            <h1 className="inline-block ml-2 text-2xl cursor-pointer" onClick={HomePageHandler}>AlgoArena</h1>
        </div>
        <div className="flex">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={userHandler}>
                {handle}
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logOutHandler}>
                Logout
            </button>
        </div>
    </nav>
);
}

export default Navbar;