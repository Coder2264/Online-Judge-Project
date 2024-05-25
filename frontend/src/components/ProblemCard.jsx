import React from 'react';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/delete.jpg';
import axiosInstance from '../Axios';

function ProblemCard({ problem, isAdmin }) {
    const navigate = useNavigate();
    const cardHandler = () => {
        localStorage.setItem("problem", JSON.stringify(problem));
        navigate("/task");
    }

    const editHandler = () => {
        localStorage.setItem("problem", JSON.stringify(problem));
        navigate("/editTask");
    }

    const deleteHandler = () => {
        console.log(problem._id);
        axiosInstance.delete(`/tasks/${problem._id}`)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="problemCard bg-gray-100 shadow-md rounded px-8 pt-6 pb-6 mb-4 w-full flex flex-row items-center justify-between">
  <div>
    <h1 className="font-bold text-3xl mb-2 text-blue-700">{problem.name}</h1>
    <div className="mb-1 text-sm text-gray-500">
      {problem.tag.map((tag, index) => (
        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
      ))}
    </div>
  </div>
  <div className="flex">
    {isAdmin && (
      <button
        className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" // Added margin-right
        onClick={editHandler}
      >
        Edit
      </button>
    )}
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => cardHandler()}>
      Solve
    </button>
    {isAdmin && (
  <img
    src={deleteIcon}
    onClick={deleteHandler}
    style={{ width: '20px', height: '20px' }}
  />
)}
  </div>
</div>
    );
}

export default ProblemCard;