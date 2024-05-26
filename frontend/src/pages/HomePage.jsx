import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProblemCard from '../components/ProblemCard';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function HomePage() {
  
  const [problems, setProblems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Create a state variable for isAdmin

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axiosInstance.post("/users/isloggedin");
        console.log(response);
        setIsAdmin(response.data.data.isAdmin); // Use the setter function to update isAdmin
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };
    isLoggedIn();
  }, []);


  useEffect(() => {
    axiosInstance.get('/tasks/')
      .then(response => {
        setProblems(response.data.data);    //axios wraps the response in a data object and server response is an api
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const addTaskHandler = () => {
    navigate('/createTask');
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600">Problems</h1>
      <div className="flex flex-wrap">
        {problems.map((task) => (
          <ProblemCard key={task._id} problem={task} isAdmin={isAdmin} />
        ))}
      </div>
      {isAdmin && (
        <div className="flex justify-center items-center mt-4"> {/* Added this div */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={addTaskHandler}
          >
            Add Task
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;