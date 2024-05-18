import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerdictPage(){
    return(
        <>
            <Navbar/>
            <h1>VerdictPage</h1>
            <Footer/>
        </>
    )
}

export default VerdictPage;