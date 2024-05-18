import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage(){
    return(
        <>
            <Navbar/>
            <h1>ProfilePage</h1>
            <Footer/>
        </>
    )
}

export default ProfilePage;