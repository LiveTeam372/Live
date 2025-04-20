import { useEffect } from 'react';
import { getRequest } from "./api/api.js";
import './App.css';

function App() {
  useEffect(()=>{
    getRequest('/Live');
  },[]);

  return (
    <div className="App">
    </div>
  );
}

export default App;
