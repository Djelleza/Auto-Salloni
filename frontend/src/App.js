import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './components/Home';
import Cars from './components/CarComponents/Cars';
import About from "./components/About";
import Contact from "./components/Contact";
import LeasingCalculator from "./components/LeasingCalculator";
import Dashboard from "./components/Dashboard";
import AddCar from "./components/CarComponents/CarForm/AddCar";
import EditCar from "./components/CarComponents/CarForm/EditCar";
import Car from "./components/CarComponents/Car";
import CompareCars from "./components/CarComponents/CompareCars";
import CarSelection from './components/CarComponents/CarSelection';
import SalesDashboard from './components/SaleComponents/salesDashboard';
import AddSale from './components/SaleComponents/SaleForm/AddSale';
const App = () => {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/leasingcalculator" element={<LeasingCalculator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/edit-car/:id" element={<EditCar />} />
            <Route path="/cars/:id" element={<Car />} />
            <Route path="/compare" element={<CompareCars />} />
            <Route path="/selection" element={<CarSelection />} />
            <Route path="/saleDash" element={<SalesDashboard/>} />
            <Route path="/add-sale" element={<AddSale/>} />
          
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
