import logo from '../assets/logo.png';
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Navbar() {

    const navigate=useNavigate();
    const userHandler = () => {
        navigate("/profile");
    }

    const logOutHandler = () => {
        localStorage.clear();
        navigate("/");
    }

  return (
    <nav className="mt-0 mb-0 flex justify-between bg-blue-500 text-white w-full p-4">
    <div className="flex items-center">
        <img src={logo} alt="logo" className="h-10 w-10"/>
        <h1 className="inline-block ml-2 text-2xl">AlgoArena</h1>
    </div>
    <div className="flex items-center">
        <button className="mr-6 text-xl bg-red-500" onClick={userHandler}>User</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logOutHandler}>
            Logout
        </button>
    </div>
</nav>
);
}

export default Navbar;