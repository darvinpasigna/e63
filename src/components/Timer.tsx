import { useEffect, useRef, useState } from 'react';
import Container from './UI/Container.tsx';
import {useTimersContext, type Timer as TimerProps} from '../Store/timers-context.tsx';

const Timer = ({name, duration}:TimerProps) => {
  const interval = useRef<number | null>(null); // gets the current value of setInterval passed to timer
  const [remainingTime, setRemainingTime] = useState(duration*1000);
  //access isRunning for useEffect trigger
const {isRunning} = useTimersContext();

//clear the interval once reach zero and ther is an active interval
if (remainingTime<=0 && interval.current) {
  clearInterval(interval.current);
}

  //useEffect manages and updates the time and calculation needed for progress bar
useEffect(()=>{
let timer: number; //declare to make it available within the scope of useEffect
//we only run if isRunning is true
  if (isRunning) {
     //store the currenlty computed time
   timer = setInterval(()=>{
    setRemainingTime((prevTime)=>{
    //include this condition to avoid -5 when pressing start/stop toggle button
    if (prevTime <= 0) {
      return prevTime;
    }
    return prevTime-50;

    prevTime-50});
  },50);
  interval.current = timer; //computed time passed in to interval as current value
  } else if(interval.current){ // if there's active interval
    clearInterval(interval.current); //cleanup interval.current
  }
 
  //does the cleanup after unmounting the function above to void unnecesary computation, return 0
  return ()=> clearInterval(timer);
},[isRunning]); //isRunning changes, it triggers the useEffect

  const formattedRemainingTime = (remainingTime/1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration*1000} value={remainingTime}/>
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
export default Timer;