import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import 'react-toastify/dist/ReactToastify.css';

function SignUp(){

    const [data,setData]=useState({
        email:"",
        fullName:"",
        handle:"",
        password:"",
        confirmPassword:"",
        dob:""
    });
        
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        //console.log(e);
        console.log(data);
        
        if(data.password!==data.confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/register", data);
            console.log(res);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((data)=>{
           return  { ...data, [name]: value }
        }
        );
    }

    return (
        <>
          <h1>Sign Up</h1>
          <form onSubmit={registerUser}>
            <input type="email" placeholder="Email" name="email" onChange={handleInputChange} required/><br/>
            <input type="text" placeholder="Full Name" name="fullName" onChange={handleInputChange} required/><br/>
            <input type="text" placeholder="Handle" name="handle" onChange={handleInputChange} required/><br/>
            <input type="password" placeholder="Password" name="password" onChange={handleInputChange} required/><br/>
            <input type="date" placeholder="Date of Birth" name="dob" onChange={handleInputChange} required/><br/>
            <button type="submit" className="bg-blue-500 text-white">Sign Up</button>  
            </form>
        </>    
    );
}

export default SignUp;