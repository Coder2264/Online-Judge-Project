import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function SignUp(){
    const instance = axios.create({
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        credentials: 'include',
    })

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
        //console.log(data);
        
        if(data.password!==data.confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/v1/users/register", data)
            .then((res) => {
                console.log(res);
                alert("User registered successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                const htmlResponse = error.response.data.message;
                console.log('Extracted message:', htmlResponse);
                toast.error(htmlResponse, { autoClose: 2000 });
            });
        } catch (error) {
            console.log('Axios Error')
            console.log(error);
        }
        
    }
    

    return (
        <>
        <ToastContainer />
          <h1>Sign Up</h1>
          <form onSubmit={registerUser}>
            <input type="email" placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})} required/><br/>
            <input type="text" placeholder="Full Name" onChange={(e)=>setData({...data,fullName:e.target.value})} required/><br/>
            <input type="text" placeholder="Handle" onChange={(e)=>setData({...data,handle:e.target.value})} required/><br/>
            <input type="password" placeholder="Password" onChange={(e)=>setData({...data,password:e.target.value})} required/><br/>
            <input type="password" placeholder="Confirm Password" onChange={(e)=>setData({...data,confirmPassword:e.target.value})} required/><br/>
            <input type="date" placeholder="Date of Birth" onChange={(e)=>setData({...data,dob:e.target.value})} required/><br/>
            <button type="submit" className="bg-blue-500 text-white">Sign Up</button>  
            </form>
        </>    
    );
}

export default SignUp;