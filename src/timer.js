import React, { useEffect, useRef, useState } from 'react';
import { FaRedo } from 'react-icons/fa';
import alarm from './alarm.mp3';
import { ReactComponent as PlayPause } from './pauseplay.svg';

const Timer = ({ sessionTime, breakTime, setIsPaused, setSessionTime, setBreakTime }) => {

    const [time, setTime] = useState(sessionTime * 60)
    const [timeComponent, setTimeComponent] = useState('')
    const [count, setCount] = useState(null);
    const [label, setLabel] = useState('Session');
    const audioRef = useRef(null);
    useEffect(() => {
        setTime(sessionTime * 60)
    }, [sessionTime])


    function play() {
        if (!count) {
            setIsPaused(false)
            setCount(setInterval(() => {
                setTime(a => a - 1)
            }, 1000));
        }
        else {
            setIsPaused(true)
            clearInterval(count)
            setCount(null)
        }
    }



    useEffect(() => {
        function startSes(id) {
            setIsPaused(false)
            clearInterval(count)
            setCount(null)
            if (id === 'Session') {
                setLabel('Break')
                setTime(breakTime * 60)
                setCount(setInterval(() => {
                    setTime(a => a - 1)
                }, 1000));
            }
            else {
                setLabel('Session')
                setTime(sessionTime * 60)
                setCount(setInterval(() => {
                    setTime(a => a - 1)
                }, 1000));
            }
        }

        if (time === -1) {
            setTimeout(() => {
                startSes(label)
            }, 1000)
        }
        else {
            setTimeComponent(`${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`)
        }
        if(time === 0){
            if (audioRef.current) {
                audioRef.current.play();
                setTimeout(()=>{
                    audioRef.current.pause()
                    audioRef.current.currentTime = 0
                }, 3000)
            }
        }
    
    }, [time, label, breakTime, sessionTime, setIsPaused, count, setCount])

    function handleReset() {
        clearInterval(count);
        setCount(null)
        setSessionTime(25)
        setBreakTime(5)
        setIsPaused(true)
        setLabel('Session')
        setTime(sessionTime * 60)
        audioRef.current.pause()
        audioRef.current.currentTime = 0
    }



    return (
        <div className='flex-flex-col justify-center'>

            <audio id="beep" ref={audioRef} src={alarm} preload="auto"></audio>
            <div className='border-[8px] rounded-lg border-green-950 px-16'>
                <h3 id="timer-label" className='text-[2.2rem]'>{label}</h3>
                <h2 id="time-left" className='text-[5rem] font-mono font-bold'>{timeComponent}</h2>
            </div>
            <div className='flex justify-center gap-5  mt-5 text-black'>
                <PlayPause onClick={play} width={23} id="start_stop" className='cursor-pointer hover:text-green-100' />
                <FaRedo onClick={handleReset} id="reset" className='text-[1.41rem] cursor-pointer hover:text-green-100' />
            </div>
        </div>
    )
}

export default Timer