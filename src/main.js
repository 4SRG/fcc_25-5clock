import React, { useState } from 'react';
import { FaHandPointDown, FaHandPointUp } from 'react-icons/fa';
import Timer from './timer';


const Main = () => {
    const [sessionTime, setSessionTime] = useState(0.1)
    const [breakTime, setBreakTime] = useState(0.1)
    const [isPaused, setIsPaused] = useState(true)

    function breakDown() {
        if (breakTime > 1 && isPaused) {
            setBreakTime(a => a - 1)
        }
    }
    function breakUp() {
        if (breakTime < 60 && isPaused) {
            setBreakTime(a => a + 1)
        }
    }
    function sessionDown() {
        if (sessionTime > 1 && isPaused) {
            setSessionTime(a => a - 1)
        }
    }
    function sessionUp() {
        if (sessionTime < 60 && isPaused) {
            setSessionTime(a => a + 1)
        }
    }

    return (
        <div className='text-center'>
            <h1 className='text-center text-[2.5rem] text-green-300 font-bold'>25 + 5 Clock</h1>
            <section className='flex gap-20 justify-center my-2'>
                <div>
                    <p id="break-label" className='text-[1.4rem]'>Break Length</p>
                    <div className='flex justify-center items-center gap-5 text-[1.7rem]'>
                        <FaHandPointDown
                            onClick={breakDown}
                            id="break-decrement" className='hover:text-green-200 cursor-pointer' />
                        <p id='break-length'>{breakTime}</p>
                        <FaHandPointUp
                            onClick={breakUp}
                            id="break-increment" className='hover:text-green-200 cursor-pointer' />
                    </div>
                </div>
                <div>
                    <p id="session-label" className='text-[1.4rem]'>Session Length</p>
                    <div className='flex justify-center items-center gap-5 text-[1.7rem]'>
                        <FaHandPointDown
                            onClick={sessionDown}
                            id="session-decrement" className='hover:text-green-200 cursor-pointer' />
                        <p id='session-length'>{sessionTime}</p>
                        <FaHandPointUp
                            onClick={sessionUp}
                            id="session-increment" className='hover:text-green-200 cursor-pointer' />
                    </div>

                </div>
            </section>

            <section className='my-4'>
                <Timer 
                    sessionTime = {sessionTime}
                    breakTime = {breakTime}
                    setIsPaused = {setIsPaused}
                    setSessionTime = {setSessionTime}
                    setBreakTime = {setBreakTime}
                    
                    />
            </section>

            <p className='font-light text-[0.8rem] text-green-200'>Designed By 4SRG</p>
            <p className='font-light text-[0.8rem] text-red-500 italic'>Programmed By Richky</p>

        </div>
    )
}
export default Main