import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './components/Home';
import Cars from './components/Cars';
import About from "./components/About";
import Contact from "./components/Contact";
import LeasingCalculator from "./components/LeasingCalculator";


const App = () => (
  <Router>
    <div className="w-full min-h-screen"> 
      <Navbar />
      <div className="w-full"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/leasingcalculator" element={<LeasingCalculator/>} />
        </Routes>
        <Footer />
      </div>
    </div>
  </Router>
);

export default App;

