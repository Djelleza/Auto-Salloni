import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../../../api/carApi';

const AddCar = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    type: '',
    year: '',
    mileage: '',
    engineSize: '',
    fuelType: '',
    color: '',
    stock: '', 
    transmission: '',
    doors: '',
    status: '', 
    price: '',
    photo: null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await addCar(data);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Car</h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-4 gap-6">
          {Object.keys(formData).map((key) =>
            key === 'photo' ? (
              <div key={key} className="col-span-4">
                <label className="block text-gray-700 font-semibold mb-2">Upload Photo</label>
                <input
                  type="file"
                  name={key}
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
            ) : key === 'stock' ? (
              <div key={key} className="col-span-1">
                <label className="block text-gray-700 font-semibold mb-2">Stock</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
                >
                  <option value="" disabled>
                    Select Stock
                  </option>
                  <option value="Used">Used</option>
                  <option value="New">New</option>
                </select>
              </div>
            ) : key === 'status' ? (
              <div key={key} className="col-span-1">
                <label className="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            ) : key === 'fuelType' ? (
              <div key={key} className="col-span-1">
                <label className="block text-gray-700 font-semibold mb-2">Fuel Type</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
                >
                  <option value="" disabled>
                    Select Fuel Type
                  </option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>
            ) : key === 'transmission' ? (
              <div key={key} className="col-span-1">
                <label className="block text-gray-700 font-semibold mb-2">Transmission</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
                >
                  <option value="" disabled>
                    Select Transmission
                  </option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
            ) : (
              <div key={key} className="col-span-1">
                <label className="block text-gray-700 font-semibold mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>
            )
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
