import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage(){
    return(
        <>
            <Navbar/>
            
            <Footer/>
        </>
    )
}

export default ProfilePage;