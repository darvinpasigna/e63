//create contextAPI
import {type ReactNode, createContext, type FC, useContext} from "react";


//to share the state and values of this context to other components
//types

type Timer = {
    name: string;
    duration: number;
};

type TimerState = {
    isRunning: boolean;
    timers: Timer[]; //array of timer
};

type TimersContextValue = TimerState & {
    addTimer: (timerData: Timer)=>void,
    startTImers: () => void,
    stopTimers: () => void,
}

// this contains functions and values shared accross components
const TimersContext = createContext<TimersContextValue | null>(null); //createcontext is a built in function
//create and customize built-in useContext() and export this
const useTimersContext = () =>{
    const timerCtx = useContext(TimersContext); //pass in the TimersContext
    //check if the timersCtx is not null, since we all know that it is not null
    if(timerCtx === null) {
        throw new Error('TimersContext should not be null!');
    }
    //otherwise
    return timerCtx;
}

//create a provider that will manage the context values
type TimersContextProviderProps = {
    children: ReactNode;
};

const TimersContextProvider:FC<TimersContextProviderProps> = ({children}) => {
const ctx: TimersContextValue = {
    timers: [],
    isRunning: false,
    addTimer(){

    },
    startTImers() {

    },
    stopTimers() {

    },
}
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
};

export default TimersContextProvider;
export {useTimersContext};