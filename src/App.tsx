import logo from './logo.svg';
import './App.css';
import RaceResult from './pages/RaceResult.tsx';
import Filter from './components/Filter.tsx'
import { useState } from 'react';

function App() {
  const [season, setSeason] = useState<string>('1950')
  const [round, setRound] = useState<string>('1')
  return (
    <div className="App">
      <Filter setSeason={setSeason} season={season} setRound={setRound}/>
      <RaceResult season={season} round={round}/>
    </div>
  );
}

export default App;
 