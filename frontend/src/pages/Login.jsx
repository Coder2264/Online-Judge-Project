import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login(){

    const [data,setData]=useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        console.log(data);

        try {
            const res = await axios.post("http://localhost:3000/api/v1/users/login", data);
            console.log(res);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type="email" placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})} required/><br/>
                <input type="password" placeholder="Password" onChange={(e)=>setData({...data,password:e.target.value})} required/><br/>
                <button type="submit" className="bg-blue-500 text-white">Login</button>
            </form>
        </div>
    );
}

export default Login;