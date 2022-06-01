import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

import './styles.css';

const Game = () => {
    const keyLabels = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F'];
    let keys = [];
    
    const getRandomInt = max => {
        return Math.floor(Math.random() * max);
    }

    //refers to the index of the current key you need to press
    const [gamePosition, setGamePosition] = useState(0);
    const [isRestart, setIsRestart] = useState(false)
    const [isReshuffle, setIsReshuffle] = useState(false);

    //current set of 7 keys
    const [keySet, setKeySet] = useState([keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)],
                                        keyLabels[getRandomInt(8)]]);
    const [time, setTime] = useState(0);

    let timeoutBar1;
    let timeoutBar2;
    let reshuffleTimeout1;

    //key codes
    const G = 71;
    const H = 72;

    const Q = 81;
    const W = 87;
    const E = 69;
    const R = 82;
    const A = 65;
    const S = 83;
    const D = 68;
    const F = 70;

    let navigate = useNavigate();

    //set keys array
    for (let i = 0; i < 7; i++) {
        if(i === 0) {
            keys.push(<div id={i} className='game-text game-keys' style={{backgroundColor: 'yellow', bottom: '10px'}}>{keySet[i]}</div>)
        } else {
            keys.push(<div id={i} className='game-text game-keys'>{keySet[i]}</div>)
        }
    } 


    const checkKeyPress = key => {
        if(gamePosition < 7) {
            //if the right key was pressed
            if(String.fromCharCode(key) === document.getElementById(`${gamePosition}`).innerText) {
                let currentKey = document.getElementById(`${gamePosition}`);
                //change the correctly pressed key to a grey color
                currentKey.style.color='rgb(25,25,25)';
                currentKey.style.backgroundColor='rgb(55,55,55)';
                currentKey.style.bottom='0px';

                setGamePosition((prev) => {
                    return prev + 1;
                })
                
                if(gamePosition < 6) {
                    //set the next key to glow yellow
                    document.getElementById(`${gamePosition + 1}`).style.backgroundColor = 'yellow';
                    document.getElementById(`${gamePosition + 1}`).style.bottom = '10px';
                }

            } else {
                reshuffle();
            }
        }
    }

    //timer bar
    const barAnimation = () => {
        let interval = 2000;
        const progressBar = document.querySelector('.progress-inner');

        let countDown = setInterval(() => {
            interval-= 5;

            let progressWidth = interval / 2000 * 100;

            if(interval > 0) {
                progressBar.style.width = progressWidth + '%';      
            } else {
                clearInterval(countDown);
                progressBar.style.width = '100%';
            }
        }, 10)
    }

    const restartVideo = video => {
       video.pause();
       video.currentTime = 0;
       video.load(); 
    }

    //get a new set of random keys
    const reshuffle = () => {
        setIsReshuffle((prev) => {
            return prev ? false : true;
        })
        for (let i = 0; i < 7; i++) {
            document.getElementById(`${i}`).style.color = 'rgb(55,55,55)';
            if(i === 0) {
                document.getElementById(`${i}`).style.backgroundColor = 'yellow';
                document.getElementById(`${i}`).style.bottom = '10px';
            } else {
                document.getElementById(`${i}`).style.backgroundColor = 'white';
                document.getElementById(`${i}`).style.bottom = '0';
            }
        }

        setGamePosition(() => {
            return 0;
        })
    }

    const restartGame = () => {
        setIsRestart((prev) => {
            return prev ? false : true;
        })
        setTime(0);
        restartVideo(document.getElementById('video-container'));

        clearTimeout(timeoutBar1);
        clearTimeout(timeoutBar2);

        clearTimeout(reshuffleTimeout1);

        timeoutBar1 = setTimeout(() => {
            barAnimation()
        }, 50);

        timeoutBar2 = setTimeout(() => {
            barAnimation()
        }, 8100);

        reshuffleTimeout1 = setTimeout(() => {
            reshuffle();
        }, 5000);
    }

    const totalRestart = () => {
        reshuffle();
        restartGame();
    }

    //sets up a timer that it used to time basically everything
    //since it gets manually set back to 0 on a full restart the floating point error isnt a big deal
    useEffect(() => {
        let intervalId;

        intervalId = setInterval(() => {
            setTime(prev => prev + 0.1);
        }, 100); 

        return () => clearInterval(intervalId);
    }, [isRestart])

    //on a reshuffle, get a new set of random keys
    useEffect(() => {
        setKeySet(() => {
            return ([keyLabels[getRandomInt(8)],keyLabels[getRandomInt(8)],
            keyLabels[getRandomInt(8)],keyLabels[getRandomInt(8)],
            keyLabels[getRandomInt(8)],keyLabels[getRandomInt(8)],
            keyLabels[getRandomInt(8)]]);
        })
    }, [isReshuffle])

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch(e.keyCode) {
                case H:
                    navigate('/');
                    break;
                case Q:
                    checkKeyPress(e.keyCode);
                    break;
                case W:
                    checkKeyPress(e.keyCode);
                    break;
                case E:
                    checkKeyPress(e.keyCode);
                    break;
                case R:
                    checkKeyPress(e.keyCode);
                    break;
                case A:
                    checkKeyPress(e.keyCode);
                    break;
                case S:
                    checkKeyPress(e.keyCode);
                    break;
                case D:
                    checkKeyPress(e.keyCode);
                    break;
                case F:
                    checkKeyPress(e.keyCode);
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    },)

    //a very cringe way to get the bar timer to start at the right time
    useEffect(() => {
        const tId = setTimeout(barAnimation, 8100);
        return () => clearTimeout(tId);
    }, []);
    useEffect(() => {
        const tId = setTimeout(barAnimation, 50);
        return () => clearTimeout(tId);
    }, []);
    useEffect(() => {
        const tId = setTimeout(reshuffle, 5000);
        return () => {clearTimeout(tId)}
    }, []);

    if(time >= 14.5) {
        totalRestart();
    }

    return (
        <div className='game-container'>
            <div className='vykas-video-game'>
                <video id='video-container' autoPlay muted loop>
                    <source src='vykas.mp4' type='video/mp4'></source>
                </video>
            </div>
            { (time < 4 || (time > 8 && time < 12)) ? <div className='game-box'>{keys}</div> : <div className='game-box' style={{display: 'none'}}>{keys}</div>}
            { (time < 4 || (time > 8 && time < 12)) ? <div className='progress'><div className='progress-inner' onClick={barAnimation}></div></div> : <div className='progress' style={{display: 'none'}}><div className='progress-inner'></div></div> }
        </div>
    )
}

export default Game;