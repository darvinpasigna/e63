import TimersContextProvider from './Store/timers-context.tsx';
import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';


const App = () => {
  return (
    //wrap with TimersCOntextProvider to share the data across the components
    <TimersContextProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimersContextProvider>
  );
}

export default App;
