import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProblemCard({ problem }) {
    const navigate=useNavigate();
    const cardHandler = () => {
        localStorage.setItem("problem",JSON.stringify(problem));
        navigate("/task");
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event)=>cardHandler()}>
            Solve
        </button>
    </div>
);
}

export default ProblemCard;