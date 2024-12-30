import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSale } from '../../../api/saleApi'; // Adjust the import path as necessary
import { fetchCars } from '../../../api/carApi'; // Adjust the import path as necessary

const AddSale = () => {
  const [formData, setFormData] = useState({
    CarId: '',
    SaleDate: '',
    SalePrice: '',
    CustomerName: '',
    CustomerEmail: '',
  });

  const [cars, setCars] = useState([]); // State për ruajtjen e makinave
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      try {
        const carData = await fetchCars(); // Merr makinat nga API
        setCars(carData); // Ruaj makinat në state
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cars.');
      }
    };
    loadCars();
  }, []); // Ky efekt ekzekutohet vetëm një herë kur komponenti ngarkohet

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = {
        CarId: formData.CarId,
        SaleDate: formData.SaleDate,
        SalePrice: formData.SalePrice,
        CustomerName: formData.CustomerName,
        CustomerEmail: formData.CustomerEmail,
      };
      console.log("Sale Data to send:", saleData);
  
    try {
      await addSale(saleData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error adding sale:', err);
      setError('Failed to add sale.');
    }
  };
  


  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Sale</h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Car</label>
            
            <select
  name="CarId"
  value={formData.CarId}
  onChange={handleFormChange}
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
>
  <option value="">Select a Car</option>
  {cars.map((car) => (
    <option key={car.Id} value={car.Id}>
      {car.Model} ({car.Year})
    </option>
  ))}
</select>

          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Sale Date</label>
            <input
              type="date"
              name="SaleDate"
              value={formData.SaleDate}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Sale Price</label>
            <input
              type="number"
              name="SalePrice"
              value={formData.SalePrice}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Customer Name</label>
            <input
              type="text"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Customer Email</label>
            <input
              type="email"
              name="CustomerEmail"
              value={formData.CustomerEmail}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Add Sale
        </button>
      </form>
    </div>
  );
};

export default AddSale;
