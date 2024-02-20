import { useTimersContext } from '../Store/timers-context.tsx';
import Button from './UI/Button.tsx';

const Header = () => {
  //access the useContext thru useTimersContext()
  const timersCtx = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>
{/* modify the buton make it dynamic, also use . to access the props of timersctx */}
      <Button onClick={
        //toggle button using contextAPI and reducer
        timersCtx.isRunning ? timersCtx.stopTimers : timersCtx.startTimers
      }
      
      >
          {timersCtx.isRunning ? 'Stop' : 'Start'} Timers
        </Button>
    </header>
  );
}
export default Header;
