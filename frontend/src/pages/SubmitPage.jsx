import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';



function SubmitPage() {

  

  const [data,setData]=useState({
    language:"",
    sourceCode:""
  });

  let problem=localStorage.getItem("problem");
  let problemName=JSON.parse(problem).name;

  const navigate=useNavigate();
  const submitSolution = async () => {
    data.problemId=JSON.parse(problem)._id;
    await axiosInstance.post('/submissions/submit/',data)
    .then(response => {
      console.log(response.data);
      localStorage.setItem("verdict",JSON.stringify(response.data.data));
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
    
    navigate("/verdict");
  }

  return (
    <>
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Navbar/>
      <div className="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <h1 className="font-bold text-3xl mb-4">Submission Page</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
            Programming Language
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="language" onChange={(e)=>{setData({...data,language:e.target.value})}}>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Awk">Awk</option>
          </select>
          <br/><br/>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
            Problem Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            id="problem-name"
            value={problemName}
            readOnly
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source-code">
            Source Code
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="source-code" onChange={(e)=>{setData({...data,sourceCode: e.target.value})}}>
            {/* Add your source code here */}
          </textarea>
        </div>
        <div className="mb-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Open File
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={submitSolution}>
            Submit
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default SubmitPage;