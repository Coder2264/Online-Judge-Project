import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateTask() {
  const [data, setData] = useState({
    name: "",
    statement: "",
    constraints: [],
    format: [],
    timeLimit: "",
    memoryLimit: "",
    testcases: [{ input: '', output: '' }, { input: '', output: '' }]
  });

  const navigate = useNavigate();

  const createTask = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await axios.post("http://localhost:3000/api/v1/tasks/", data)
        .then((res) => {
          console.log(res);
          alert("Task created successfully");
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          const htmlResponse = error.response.data.message;
          console.log('Extracted message:', htmlResponse);
          alert(htmlResponse);
        });
    } catch (error) {
      console.log('Axios Error')
      console.log(error);
    }
  }

  const addTestcase = () => {
    setData(prevData => ({
      ...prevData,
      testcases: [...prevData.testcases, { input: '', output: '' }]
    }));
  };

  const handleTestcaseChange = (index, field, value) => {
    setData(prevData => {
      const newTestcases = [...prevData.testcases];
      newTestcases[index][field] = value.split('\n');
      return { ...prevData, testcases: newTestcases };
    });
  };

  return (
    <div className="container mx-auto px-4">
  <h1 className="text-4xl font-bold mb-4">Create Problem Statement</h1>
  <form onSubmit={createTask} className="space-y-4">
    <input
      type="text"
      placeholder="Name"
      value={data.name}
      onChange={(e) => setData({ ...data, name: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded"
    />
    <textarea
      placeholder="Statement"
      value={data.statement}
      onChange={(e) => setData({ ...data, statement: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded resize-y"
      rows="4"
    />
    <textarea
      placeholder="Constraints"
      value={data.constraints}
      onChange={(e) => setData({ ...data, constraints: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded resize-y"
      rows="2"
    />
    <textarea
      placeholder="Format"
      value={data.format}
      onChange={(e) => setData({ ...data, format: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded resize-y"
      rows="2"
    />
        <input
          type="text"
          placeholder="Time Limit"
          value={data.timeLimit}
          onChange={(e) => setData({ ...data, timeLimit: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Memory Limit"
          value={data.memoryLimit}
          onChange={(e) => setData({ ...data, memoryLimit: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <h2 className="text-2xl font-bold">Testcases</h2>
        <button type="button" onClick={addTestcase} className="px-4 py-2 bg-blue-500 text-white rounded">Add Testcase</button>
        {data.testcases.map((testcase, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
            <textarea
            placeholder="Input"
            value={testcase.input}
            onChange={(e) => handleTestcaseChange(index, 'input', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded resize-y"
            rows="2"
            />
            <textarea
            placeholder="Output"
            value={testcase.output}
            onChange={(e) => handleTestcaseChange(index, 'output', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded resize-y"
            rows="2"
            />
        </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;