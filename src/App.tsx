import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </>
  );
}

export default App;
