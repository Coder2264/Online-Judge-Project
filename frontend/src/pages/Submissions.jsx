import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubmissionCard from '../components/SubmissionCard'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function SubmissionsPage(){
    const [submissions, setSubmissions] = useState([
        {
        }
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/submissions/')
          .then(response => {
            setSubmissions(response.data.data.submissions);
            console.log(response.data.data.submissions);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);

    return (
        <div>
            <Navbar />
            
            <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600">Submissions</h1>
            <div className="flex flex-wrap">
                {submissions.map((submission) => (
                    <SubmissionCard key={submission._id} submission={submission} />
                ))}
            </div>
            
            <Footer />
        </div>
    );
}

export default SubmissionsPage;