import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCars } from '../../api/carApi';


const Cars = () => {
  const navigate = useNavigate();


  const [carsData, setCarsData] = useState([]);
  const [filters, setFilters] = useState({
    brand: {},
    model: {},
    fuelType: {},
    transmission: {},
    color: {},
  });
  const [selectedFilters, setSelectedFilters] = useState({
    brand: null,
    model: null,
    fuelType: null,
    transmission: null,
    color: null,
  });
  const [stockFilter, setStockFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCars, setSelectedCars] = useState([]);

  
  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars();
        setCarsData(data);

        const calculateFilters = (data, key) => {
          return data.reduce((acc, car) => {
            const value = car[key];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
          }, {});
        };

        setFilters({
          brand: calculateFilters(data, 'Brand'),
          model: calculateFilters(data, 'Model'),
          fuelType: calculateFilters(data, 'FuelType'),
          transmission: calculateFilters(data, 'Transmission'),
          color: calculateFilters(data, 'Color'),
        });
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    getCars();
  }, []);

 
  const matchSearchTerm = (car, term) => {
    return (
      car.Brand.toLowerCase().includes(term.toLowerCase()) ||
      car.Model.toLowerCase().includes(term.toLowerCase()) ||
      car.Type.toLowerCase().includes(term.toLowerCase()) ||
      car.Year.toString().includes(term) ||
      car.Mileage.toString().includes(term) ||
      car.EngineSize.toString().includes(term) ||
      car.FuelType.toLowerCase().includes(term.toLowerCase()) ||
      car.Color.toLowerCase().includes(term.toLowerCase()) ||
      car.Stock.toLowerCase().includes(term.toLowerCase()) ||
      car.Transmission.toLowerCase().includes(term.toLowerCase()) ||
      car.Doors.toString().includes(term)
    );
  };
  

  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      const matchesStock =
        stockFilter === 'All' ||
        (stockFilter === 'New' && car.Stock.toLowerCase() === 'new') ||
        (stockFilter === 'Used' && car.Stock.toLowerCase() === 'used');

      const matchesSearch = matchSearchTerm(car, searchTerm);

      return (
        matchesStock &&
        matchesSearch &&
        (!selectedFilters.brand || car.Brand === selectedFilters.brand) &&
        (!selectedFilters.model || car.Model === selectedFilters.model) &&
        (!selectedFilters.fuelType || car.FuelType === selectedFilters.fuelType) &&
        (!selectedFilters.transmission || car.Transmission === selectedFilters.transmission) &&
        (!selectedFilters.color || car.Color === selectedFilters.color)
      );
    });
  }, [carsData, stockFilter, selectedFilters, searchTerm]);


  const handleCompare = () => {

      navigate('/selection', { state: { selectedCars } });
    
  };

  const navigateToCarDetails = (id) => {
    navigate(`/cars/${id}`);
  };

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
                    onClick={() =>
                      setSelectedFilters((prev) => ({ ...prev, [filterKey]: option }))
                    }
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
              onClick={handleCompare}
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
        <span
          className={`cursor-pointer ${stockFilter === 'All' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setStockFilter('All')}
        >
          Cars ({carsData.length})
        </span>
        <span
          className={`cursor-pointer ${stockFilter === 'New' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setStockFilter('New')}
        >
          New ({carsData.filter((car) => car.Stock.toLowerCase() === 'new').length})
        </span>
        <span
          className={`cursor-pointer ${stockFilter === 'Used' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => setStockFilter('Used')}
        >
          Used ({carsData.filter((car) => car.Stock.toLowerCase() === 'used').length})
        </span>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20 py-8 mx-auto max-w-screen-xl mt-8">
        {filteredCars.map((car) => (
          <div
            key={car.Id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-center transform hover:scale-105 transition-transform duration-200 relative"
            onClick={() => navigateToCarDetails(car.Id)}
          >
            <img
              src={`http://localhost:5001${car.Photo}`}
              alt={`Car ${car.Id}`}
              className="max-w-full max-h-full"
            />
            
            <div className="p-4 flex flex-col items-center justify-center text-center">
  <p className="text-base lg:text-lg font-semibold text-white">
    {car.Year} | {car.Mileage} km
  </p>
  <button
    className={`mt-4 px-4 py-2 rounded ${
      car.Status === 'Sold' ? 'bg-gray-500' : 'bg-green-400 hover:bg-green-300'
    }`}
    disabled={car.Status === 'Sold'}
  >
    {car.Status === 'Sold' ? 'Sold' : 'Contact for Price'}
  </button>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
