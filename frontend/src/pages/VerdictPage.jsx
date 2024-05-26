import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function VerdictPage(){

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axiosInstance.post("/users/isloggedin");
        console.log(response);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };
    isLoggedIn();
  }, []);



    let verdict=JSON.parse(localStorage.getItem("verdict"));
    return(
        <>
  <Navbar/>
  <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
    <h1 className="text-4xl font-bold text-center my-8">VerdictPage</h1>
    <hr className="border-2 border-gray-200 mb-8"/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Source Code</h2>

        <div className="border rounded p-4 bg-gray-100">
          <pre className="whitespace-pre-wrap">
          {verdict.sourceCode}
        </pre>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4">Submission Info</h2>
        <div className="border rounded p-4 bg-gray-100">
        {Object.keys(verdict).map((key) => {
        if (key === 'sourceCode') return null;

        return (
          <div key={key} className="flex items-center mb-2">
            <h3 className="text-xl font-bold mr-2">{key}:</h3>
            <p className="text-lg">{verdict[key]}</p>
          </div>
        );
      })}
      </div>
      </div>
    </div>
  </div>
  <Footer/>
</>
    )
}

export default VerdictPage;