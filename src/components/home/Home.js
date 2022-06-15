import React from "react";
import { useNavigate } from 'react-router-dom';

import './styles.css';

const Home = () => {
    const topMessage = <p className='text'>Thought the Vykas DDR mechanic might be tough for the first couple tries so I made this to practice</p>;
    const botMessage = <p className='text'>Press the start button to play. 'H' will bring you back here.</p>

    let navigate = useNavigate();

    const handleStart = () => {
       navigate('/game'); 
    }

    return (
        <div className='home-container'>
            <div className='vykas-video'>
                <video autoPlay muted loop>
                    <source src='vykas.mp4' type='video/mp4'></source>
                </video>
            </div>
            <div className='content-container'>
                <div className='center-top-text'>
                    {topMessage}
                </div>
                <div className='center-button'>
                    <button class="button-68" onClick={handleStart}>start</button>
                </div>
                <div className='center-bot-text'>
                    {botMessage}
                </div>
            </div>
        </div>
    );
}

export default Home;