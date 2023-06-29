import './App.css';
import RaceResult from './pages/RaceResult.tsx';
import Filter from './components/Filter.tsx'
import { useState } from 'react';
import RaceResultDriver from './pages/RaceResultDriver.tsx';

function App() {
  const [season, setSeason] = useState<string>('2023')
  const [round, setRound] = useState<string>('1')
  const [driver, setDriver] = useState<string>('alonso')
  const [fullname, setFullName] = useState<string>('Fernando Alonso')
  const [typeResult, setTypeResult] = useState<string>('races')
  return (
    <div className="App">
      <Filter setSeason={setSeason} season={season} setRound={setRound} setType={setTypeResult} typeResult={typeResult} setDriver={setDriver} setFullName={setFullName}/>
      {typeResult === 'races' && <RaceResult season={season} round={round}/>}
      {typeResult === 'drivers' && <RaceResultDriver season={season} driver={driver} fullname={fullname}/>}
    </div>
  );
}

export default App;
 