import logo from './logo.svg';
import './App.css';
import RaceResult from './pages/RaceResult.tsx';
import Filter from './components/Filter.tsx'
import { useState } from 'react';

function App() {
  const [season, setSeason] = useState<string>('1950')
  return (
    <div className="App">
      <Filter setSeason={setSeason}/>
      <RaceResult season={season}/>
    </div>
  );
}

export default App;
 