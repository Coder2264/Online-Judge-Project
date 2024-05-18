import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SubmitPage() {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Navbar/>
      <div className="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <h1 className="font-bold text-3xl mb-4">Submit</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
            Programming Language
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="language">
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Awk">Others</option>
        </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source-code">
            Source Code
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="source-code">
            {/* Add your source code here */}
          </textarea>
        </div>
        <div className="mb-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Open File
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SubmitPage;