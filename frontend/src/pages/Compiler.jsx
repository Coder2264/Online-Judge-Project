import React, { useState } from 'react';
import axiosInstance from '../Axios';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Compiler() {
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n  int num1, num2, sum;\n  cin >> num1 >> num2;\n  sum = num1 + num2;\n  cout << "The sum of the two numbers is: " << sum;\n  return 0;\n}`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp'); // New state variable for the selected language

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input
    };
    try {
      const { data } = await axiosInstance.post('/submissions/compile', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
      const extractedMessage = error.response.data.message;
      toast.error(extractedMessage, { autoClose: 2000 });
    }
  }

  return (
    <>
    <Navbar />
    <ToastContainer />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Online Code Compiler</h1>
      <div className="container mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 px-4">
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Editor</h2>
            <div className="mb-4">
              <label className="mr-2">Language:</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border border-gray-300 rounded-md p-2">
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
            </div>
            <div className="mb-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 border border-gray-300 rounded-md p-2 font-mono text-sm"
                placeholder="Write your code here..."
                style={{ minHeight: '50vh' }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
            >
              Run
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Input</h2>
            <textarea
              rows="5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Output</h2>
            <div className="bg-gray-100 p-4 rounded-md text-gray-800 font-mono whitespace-pre-wrap">{output}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Compiler;
