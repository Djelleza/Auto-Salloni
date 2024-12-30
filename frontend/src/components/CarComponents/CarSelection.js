import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarFilters } from './CarFilters'; 

const CarSelection = () => {
  const navigate = useNavigate();


  const {
    carsData,
    filters,
    selectedFilters,
    stockFilter,
    searchTerm,
    filteredCars,
    setSelectedFilters,
    setStockFilter,
    setSearchTerm,
    updateSelectedFilters,
  } = useCarFilters(); 

  const [selectedCars, setSelectedCars] = useState([]);

  const toggleCarSelection = (carId) => {
    setSelectedCars((prevSelected) => {
      if (prevSelected.includes(carId)) {
        return prevSelected.filter((id) => id !== carId);
      } else {
        return [...prevSelected, carId];
      }
    });
  };

  const handleCompareAndNavigate = () => {
    if (selectedCars.length < 2) {
      alert('You should choose two or more cars to compare');
      return;
    }
    navigate('/compare', { state: { selectedCars } });
  };

  const totalCars = carsData.length;
  const newCars = carsData.filter((car) => car.Stock.toLowerCase() === 'new').length;
  const usedCars = carsData.filter((car) => car.Stock.toLowerCase() === 'used').length;

  return (
    <div className="bg-green-50 text-black">
      <nav className="bg-black p-8 flex justify-between items-center relative z-10 rounded-b-lg max-w-6xl mx-auto px-25">
        <ul className="flex space-x-8 flex-wrap justify-start w-full">
          {['brand', 'model', 'fuelType', 'transmission', 'color'].map((filterKey) => (
            <li key={filterKey} className="relative group text-white">
              <span>{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</span>
              <i className="fas fa-chevron-down ml-2"></i>
              <ul className="absolute left-0 top-full hidden bg-gray-800 rounded shadow-lg group-hover:block z-20">
                {Object.entries(filters[filterKey]).map(([option, count]) => (
                  <li
                    key={option}
                    className={`flex justify-between items-center px-4 py-2 hover:bg-green-400 cursor-pointer ${
                      selectedFilters[filterKey] === option ? 'bg-green-500' : ''
                    }`}
                    onClick={() => updateSelectedFilters(filterKey, option)}
                  >
                    <span className="truncate">{option}</span>
                    <span className="ml-2 text-gray-300">({count})</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <button
              className="bg-green-400 px-4 py-2 rounded hover:bg-gray-500"
              onClick={() =>
                setSelectedFilters({
                  brand: null,
                  model: null,
                  fuelType: null,
                  transmission: null,
                  color: null,
                })
              }
            >
              Clear All
            </button>
          </li>
          <li>
            <button
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400"
              onClick={handleCompareAndNavigate}
            >
              Compare
            </button>
          </li>
          <li className="ml-4 w-full sm:w-auto">
            <input
              type="text"
              className="p-2 w-full sm:w-auto rounded border border-gray-300"
              placeholder="Search for cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
        </ul>
      </nav>

      <div className="py-4 px-6 flex justify-start items-center text-xl font-semibold ml-[200px] space-x-8 mt-8">
        <button
          onClick={() => navigate('/cars')}
          className="mb-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
        >
          Back
        </button>

        <span
          className={`cursor-pointer ${stockFilter === 'All' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setStockFilter('All')}
        >
          Cars ({totalCars})
        </span>
        <span
          className={`cursor-pointer ${stockFilter === 'New' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setStockFilter('New')}
        >
          New ({newCars})
        </span>
        <span
          className={`cursor-pointer ${stockFilter === 'Used' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setStockFilter('Used')}
        >
          Used ({usedCars})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20 py-8 mx-auto max-w-screen-xl mt-8">
        {filteredCars.map((car) => (
          <div
            key={car.Id}
            className={`bg-gray-800 rounded-lg shadow-md overflow-hidden text-center transform transition-transform duration-200 ${
              selectedCars.includes(car.Id) ? 'border-4 border-green-400 scale-105 shadow-xl' : 'hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => toggleCarSelection(car.Id)}
          >
            <img
              src={`http://localhost:5001${car.Photo}`}
              alt={`Car ${car.Id}`}
              className="max-w-full max-h-full"
            />
            <div className="p-4">
              <p className="text-base lg:text-lg font-semibold text-white">
                {car.Year} | {car.Mileage}
              </p>
              <button
                className={`mt-4 px-4 py-2 rounded transition-colors duration-300 ${
                  selectedCars.includes(car.Id) ? 'bg-red-500 hover:bg-red-400' : 'bg-green-400 hover:bg-green-300'
                }`}
              >
                {selectedCars.includes(car.Id) ? 'Deselect' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSelection;
