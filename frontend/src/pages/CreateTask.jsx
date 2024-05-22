import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateTask() {
  const instance = axios.create({
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    credentials: 'include',
  })

  const [data, setData] = useState({
    name: "",
    statement: "",
    constraints: ["", ""],
    format: "",
    testcases: [{ input: [""], output: [""] }, { input: [""], output: [""] }],
    tag: [],
    timeLimit: "",
    memoryLimit: ""
  });

  const navigate = useNavigate();

  const createTask = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const res = await instance.post("http://localhost:3000/api/v1/tasks/", data);
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddConstraint = () => {
    setData(prevData => {
      const newConstraints = [...prevData.constraints, ''];
      return { ...prevData, constraints: newConstraints };
    });
  };


  const handleDeleteConstraint = (index) => {
    setData(prevData => {
      const newConstraints = prevData.constraints.filter((_, i) => i !== index);
      return { ...prevData, constraints: newConstraints };
    });
  };


  const handleInputChange = (field, value) => {
    setData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setData(prevData => {
      const newArray = [...prevData[field]];
      newArray[index] = value;
      return { ...prevData, [field]: newArray };
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-5 text-3xl font-bold text-gray-700">Create Problem</h1>
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Name"
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <textarea
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Statement"
              onChange={(e) => handleInputChange('statement', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6 bg-white rounded shadow p-4">
          <h2 className="w-full px-3 mb-3 text-2xl font-bold text-gray-700">Constraints</h2>
          {data.constraints.map((constraint, index) => (
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                key={index}
                placeholder={`Constraint ${index + 1}`}
                value={constraint}
                onChange={(e) => handleArrayChange('constraints', index, e.target.value)}
              />
              <button onClick={() => handleDeleteConstraint(index)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">Delete</button>
            </div>
          ))}
          <button onClick={handleAddConstraint} className="w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Add Constraint</button>

        </div>

        <div className="flex flex-wrap -mx-3 mb-6 bg-white rounded shadow p-4">
          <h2 className="w-full px-3 mb-3 text-2xl font-bold text-gray-700">Format</h2>
          <div className="w-full px-3">
            <textarea
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Format"
              value={data.format}
              onChange={(e) => handleInputChange('format', e.target.value)}
            />
          </div>
        </div>

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
            </div>
          ))}
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Time Limit"
              onChange={(e) => handleInputChange('timeLimit', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Memory Limit"
              onChange={(e) => handleInputChange('memoryLimit', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={createTask}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTask;