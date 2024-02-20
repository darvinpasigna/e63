//create contextAPI
import {type ReactNode, createContext, type FC, useContext, useReducer} from "react";


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

//declare initialStates for useReducer function()
const initialState: TimerState = {
    isRunning: true,
    timers: [],
}
type TimersContextValue = TimerState & {
    addTimer: (timerData: Timer)=>void,
    startTimers: () => void,
    stopTimers: () => void,
};
//prepare types for discreminatted union of actions to cater optional payload
type StartTimersAction = {
    type : 'START_TIMERS';
};
type StopTimersAction = {
    type: 'STOP_TIMERS';
};

// with payload
type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer; //name and duration
};
//discreminated with union type
type Action = StartTimersAction | StopTimersAction | AddTimerAction;
//create reducer to take in initial state, action and return a timer state
const timersReducer = (state: TimerState, action: Action):TimerState => {
    //check the type of action from dicriminated union
    //pass in the TimerState thru ...state or state
    if (action.type === 'START_TIMERS') {
        return {
            ...state, //retain all other value
            isRunning: true,
        };
    }
    if (action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false,
        };
    }
    if (action.type === 'ADD_TIMER') {
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    name: action.payload.name, //payload contains the timer object
                    duration: action.payload.duration
                },
            ],
        };
        
    }
    //default return
    return state;
};

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
    //use useReducer() to access the timer state, and use dispatch to change the state
    //use timersReducer as parameter for reducer
    const [TimerState, dispatch] = useReducer(timersReducer, initialState);

const ctx: TimersContextValue = {
    timers: TimerState.timers,
    isRunning: TimerState.isRunning,
    addTimer(timerData){
        dispatch({type: 'ADD_TIMER', payload: timerData});
    },
    startTimers() {
        dispatch({type: 'START_TIMERS'});
    },
    stopTimers() {
        dispatch({type: 'STOP_TIMERS'});
    },
}
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
};

export default TimersContextProvider;
export {useTimersContext};