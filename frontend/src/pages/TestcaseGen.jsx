import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../assets/back.jpg';
import axiosInstance from '../Axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function TestcaseGen() {

  const [data, setData] = useState({});

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axiosInstance.post("/users/isloggedin");
        console.log(response);
        if (!response.data.data.isAdmin) {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };
    isLoggedIn();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/testcases?taskId=${taskId}`);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


    const handleAddTestcase = () => {
        setData(prevData => {
          const newTestcases = [...prevData.testcases, { input: [""], output: [""] }];
          return { ...prevData, testcases: newTestcases };
        });
      };
    
      const handleDeleteTestcase = (index) => {
        setData(prevData => {
          const newTestcases = prevData.testcases.filter((_, i) => i !== index);
          return { ...prevData, testcases: newTestcases };
        });
      };
    
      const handleTestcaseChange = (testcaseIndex, field, index, value) => {
        setData(prevData => {
          const newTestcases = [...prevData.testcases];
          newTestcases[testcaseIndex][field][index] = value;
          return { ...prevData, testcases: newTestcases };
        });
      };

    return (
        <>
        <Navbar />
        <div className="flex flex-wrap -mx-3 mb-6 bg-white rounded shadow p-4">
          <h2 className="w-full px-3 mb-3 text-2xl font-bold text-gray-700">Test Cases</h2>
          {data.testcases.map((testcase, testcaseIndex) => (
            <div key={testcaseIndex} className="w-full px-3 mb-6 bg-gray-200 rounded shadow p-4">
              <h3 className="mb-3 text-xl font-bold text-gray-700">Testcase {testcaseIndex + 1}</h3>
              {testcase.input.map((input, index) => (
                <div className="w-full px-3 mb-3">
                  <textarea
                    className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    key={index}
                    placeholder={`Input ${index + 1}`}
                    value={input}
                    onChange={(e) => handleTestcaseChange(testcaseIndex, 'input', index, e.target.value)}
                  />
                </div>
              ))}

              {testcase.output.map((output, index) => (
                <div className="w-full px-3 mb-3">
                  <textarea
                    className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    key={index}
                    placeholder={`Output ${index + 1}`}
                    value={output}
                    onChange={(e) => handleTestcaseChange(testcaseIndex, 'output', index, e.target.value)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => handleDeleteTestcase(testcaseIndex)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">Delete Test Case</button>
            </div>
          ))}
          <button type="button" onClick={handleAddTestcase} className="w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Add Test Case</button>
        </div>
        <Footer />
        </>
    )
}

export default TestcaseGen;