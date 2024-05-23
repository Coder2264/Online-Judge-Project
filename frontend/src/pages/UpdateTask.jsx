import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function UpdateTask() {
  const instance = axios.create({
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    credentials: 'include',
  });

  const { id } = useParams(); // assuming the id of the task is passed as a URL parameter
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    statement: "",
    constraints: [],
    format: "",
    testcases: [],
    tag: [],
    timeLimit: "",
    memoryLimit: ""
  });

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get(`http://localhost:3000/api/v1/tasks/${id}`);
      setInitialValues(response.data);
    }
    fetchData();
  }, [id]);

  const { values, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: async (values) => {
      try {
        const res = await instance.put(`http://localhost:3000/api/v1/tasks/${id}`, values);
        console.log(res);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleAddConstraint = () => {
    handleChange({
      target: {
        name: 'constraints',
        value: [...values.constraints, ''],
      },
    });
  };

  const handleDeleteConstraint = (index) => {
    handleChange({
      target: {
        name: 'constraints',
        value: values.constraints.filter((_, i) => i !== index),
      },
    });
  };

  const handleAddTestcase = () => {
    handleChange({
      target: {
        name: 'testcases',
        value: [...values.testcases, { input: [""], output: [""] }],
      },
    });
  };

  const handleDeleteTestcase = (index) => {
    handleChange({
      target: {
        name: 'testcases',
        value: values.testcases.filter((_, i) => i !== index),
      },
    });
  };

  const handleArrayChange = (field, index, value) => {
    handleChange({
      target: {
        name: field,
        value: values[field].map((item, i) => (i === index ? value : item)),
      },
    });
  };

  const handleTestcaseChange = (testcaseIndex, field, index, value) => {
    handleChange({
      target: {
        name: 'testcases',
        value: values.testcases.map((testcase, i) =>
          i === testcaseIndex
            ? { ...testcase, [field]: testcase[field].map((item, j) => (j === index ? value : item)) }
            : testcase
        ),
      },
    });
  };

  const handleTagChange = (value) => {
    handleChange({
      target: {
        name: 'tag',
        value: value.split(','),
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-5 text-3xl font-bold text-gray-700">Update Problem</h1>
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Name"
              onChange={handleNameChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <textarea
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Statement"
              onChange={handleStatementChange}
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
              onChange={handleFormatChange}
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
              <button onClick={() => handleDeleteTestcase(testcaseIndex)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">Delete Test Case</button>
            </div>
          ))}
          <button onClick={handleAddTestcase} className="w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Add Test Case</button>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Time Limit"
              onChange={handleTimeLimitChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Memory Limit"
              onChange={handleMemoryLimitChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Tags (comma separated)"
              onChange={(e) => handleTagChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
    <button
      className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
      type="submit"
      onClick={updateTask}
    >
      Update Task
    </button>
    </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateTask;