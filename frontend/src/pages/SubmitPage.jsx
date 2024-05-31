import React, { useState, useEffect } from 'react';
import axiosInstance from '../Axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProblemSubmission() {
  const [code, setCode] = useState('');
  const [problemId, setProblemId] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosInstance.get('/tasks/');
        setProblems(data.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      problem_id: problemId,
    };

    try {
      const { data } = await axiosInstance.post('/submissions/submit', payload);
      toast.success('Submission successful!', { autoClose: 2000 });
      setTimeout(() => {
        navigate('/verdict');
      }, 2000);
    } catch (error) {
      const htmlResponse = error.response.data;
      const preContent = String(htmlResponse.match(/<pre>(.*?)<\/pre>/s)[1]);
      const extractedMessage = preContent.split('<br>')[0].trim();
      toast.error(extractedMessage, { autoClose: 2000 });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <ToastContainer />
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Problem Submission</h1>
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
                <label className="mr-2">Problem:</label>
                <select value={problemId} onChange={(e) => setProblemId(e.target.value)} className="border border-gray-300 rounded-md p-2">
                  <option value="" disabled>Select a problem</option>
                  {problems.map(problem => (
                    <option key={problem._id} value={problem._id}>{problem.name}</option>
                  ))}
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemSubmission;
