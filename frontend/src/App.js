import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cars from './components/Cars';

const App = () => (
  <Router>
    <div className="w-full min-h-screen"> 
      <Navbar />
      <div className="w-full"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
