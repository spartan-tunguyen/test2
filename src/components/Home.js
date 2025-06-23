import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../style/home.css';

import ReactPlayer from 'react-player';

const Home = () => {

    // Set the title of the page
    useEffect(()=> {
        document.title = "Home | Radian";
    }, []);

    // Initialize state variables
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    return (
        <>
        <div className="homeContainer">
            <div className="surveyContainer">
            </div>

            <div className="todoContainer">
            </div>
        </div>
        </>
    );
}

export default Home;