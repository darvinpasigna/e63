import { useTimersContext } from "../Store/timers-context.tsx";
import Timer from "./Timer.tsx";

const Timers = () => {
  const {timers} = useTimersContext();
  return (
    //list of timers
    <ul>
      {timers.map((timer)=>(
        <li key={timer.name}>
          <Timer {...timer} /></li>
      ))}
      
    </ul>
  );
}
export default Timers;