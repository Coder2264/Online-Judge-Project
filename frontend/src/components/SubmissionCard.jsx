import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function SubmissionCard({submission}){
    const navigate = useNavigate();
    const submissionHandler = () => {
        navigate(`/pastSubmissions/${submission._id}`);
    }
    
    return (
        <div className="problemCard bg-gray-100 shadow-md rounded px-8 pt-6 pb-6 mb-4 w-full flex flex-row items-center justify-between">
        <div>
            <h1 className="font-bold text-3xl mb-2 text-blue-700">{submission.taskName}</h1>
            <div className="mb-1 text-sm text-gray-500">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{submission.language}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{submission.verdict}</span>
            </div>
        </div>
        <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => submissionHandler()}>
            View Verdict
            </button>
        </div>
        </div>
    );
}

export default SubmissionCard;