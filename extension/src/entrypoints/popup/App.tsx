import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="logos">
        <img src={reactLogo} alt="React Logo" className="logo" />
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>Edit and save to test HMR</p>
      </div>
    </div>
  );
}

export default App;
