import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskPage() {

  let task = localStorage.getItem("problem");
  task = JSON.parse(task);

  const navigate = useNavigate();
  const submitSolution = () => {
    navigate("/submit");
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <div className="w-3/4 bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 mt-4">
          <h1 className="font-bold text-3xl mb-4">{task.name}</h1>
          <h2 className="font-bold text-2xl mb-2">Problem Statement</h2>
          <div className="mb-4 p-4 bg-gray-100 rounded" style={{ whiteSpace: 'pre-wrap' }}>{task.statement}</div>
          <h2 className="font-bold text-2xl mb-2">Format</h2>
          <div className="mb-4 p-4 bg-gray-100 rounded" style={{ whiteSpace: 'pre-wrap' }}>{task.format}</div>
          <h2 className="font-bold text-2xl mb-2">Constraints</h2>
          <ul className="list-disc pl-5 mb-4">
            {task.constraints.map((constraint, index) => (
              <li key={index} className="mb-1">{constraint}</li>
            ))}
          </ul>
          
          <h2 className="font-bold text-2xl mb-2">Test Cases</h2>
          <div>
            {task.testcases.map((testcase, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
                <h2 className="font-bold text-xl mb-2">Input</h2>
                <p className="mb-2" style={{ whiteSpace: 'pre-wrap' }}>{testcase.input}</p>
                <h2 className="font-bold text-xl mb-2">Output</h2>
                <p className="mb-2" style={{ whiteSpace: 'pre-wrap' }}>{testcase.output}</p>
              </div>
            ))}
          </div>
          <h2 className="font-bold text-2xl mb-2">Time Limit</h2>
          <p className="mb-4">{task.timeLimit}</p>
          <h2 className="font-bold text-2xl mb-2">Memory Limit</h2>
          <p className="mb-4">{task.memoryLimit}</p>
          <button className="font-bold bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200 ease-in-out" onClick={submitSolution}>
            Submit Solution!
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TaskPage;