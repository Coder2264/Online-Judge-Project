import logo from '../assets/AlgoForces.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function Navbar() {
  const navigate = useNavigate();
  let handle = localStorage.getItem('handle');

  const logOutHandler = async () => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error('Failed to log out:', error);
    }

  }

  return (
    <nav className="mt-0 mb-0 flex justify-between bg-blue-500 text-white w-full p-4">
      <div className="flex items-center p-1 bg-blue-500 text-white">
        <img src={logo} alt="logo" className="h-10 w-10" />
        {/*Here anchor tag makes it a link and e.preventDefault prevents full page reload when it is clicked directly */}
        <h1 
        className="inline-block ml-2 text-2xl cursor-pointer hover:text-blue-300" 
        onClick={(e) => {
          e.preventDefault();
          navigate('/home');
        }}
      >
        <a href="/home" className="no-underline">AlgoForces</a>
      </h1>
      <h1 
        className="inline-block ml-2 text-2xl cursor-pointer hover:text-blue-300" 
        onClick={(e) => {
          e.preventDefault();
          navigate('/compiler');
        }}
      >
        <a href="/compiler" className="no-underline">Compiler</a>
      </h1>
      </div>
      <div className="flex">

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={()=>{navigate('/profile')}}>
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