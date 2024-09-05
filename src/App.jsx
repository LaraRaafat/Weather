import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeathApp from './components/weathApp';
import BarChart from './components/PIeChart';
import './components/weathApp.css'; 

const App = () => {
  const data = [
    { name: 'New York', value: 60 },
    { name: 'Los Angeles', value: 80 },
    { name: 'Chicago', value: 45 },
    { name: 'Houston', value: 60 },
   
    { name: 'Philadelphia', value: 90 },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeathApp />} />
        <Route path="/barchart" element={<BarChart data={data} />} />
      </Routes>
    </Router>
  );
};

export default App;
