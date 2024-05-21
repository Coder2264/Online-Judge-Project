import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProblemCard from '../components/ProblemCard';
import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage(){
  const instance = axios.create({
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    credentials: 'include',
})
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/tasks/')
          .then(response => {
            setProblems(response.data.data);    //axios wraps the response in a data object and server response is an api
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);
      
    return (
        <div>
        <Navbar/>
        <h1>Problems</h1>
        <div className="flex flex-wrap">
          {problems.map((task)=>(
            <ProblemCard key={task._id} problem={task}/>
          ))}
        </div>
        <Footer/>
      </div>
    );
}

export default HomePage;