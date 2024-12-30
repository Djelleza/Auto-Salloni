import { useState, useEffect, useMemo } from 'react';
import { fetchCars } from '../../api/carApi';

export const useCarFilters = () => {
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

  const updateSelectedFilters = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  
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

  return {
    carsData,
    filters,
    selectedFilters,
    stockFilter,
    searchTerm,
    setSelectedFilters,
    setStockFilter,
    setSearchTerm,
    filteredCars,
    updateSelectedFilters,
  };
};
