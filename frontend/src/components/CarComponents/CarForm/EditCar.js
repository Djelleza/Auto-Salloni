import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCarById, updateCar } from '../../../api/carApi';

const EditCar = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Brand: '',
    Model: '',
    Type: '',
    Year: '',
    Mileage: '',
    EngineSize: '',
    FuelType: '',
    Color: '',
    Stock: '',
    Transmission: '',
    Doors: '',
    Status: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const car = await fetchCarById(id);
        const { Id, ...rest } = car;  
        setFormData(rest);  
      } catch (err) {
        setError('Failed to fetch car data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        Year: parseInt(formData.Year),  
        Mileage: parseInt(formData.Mileage),  
        EngineSize: parseFloat(formData.EngineSize),  
        Price: parseFloat(formData.Price),  
      };
      console.log('Updated form data before sending:', updatedFormData);

      console.log('Sending car data for update:', id, formData);
      const result = await updateCar(id, formData);
      console.log('Update successful:', result);  
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to update car');
      console.error(error);
    }
  };
  
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Car</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-4 gap-4"
      >
        {Object.entries(formData).map(([key, value]) => {
  if (key === 'Stock') {
    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700 mb-1">Stock</label>
        <select
          name={key}
          value={value}
          onChange={handleFormChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select Stock</option>
          <option value="Used">Used</option>
          <option value="New">New</option>
        </select>
      </div>
    );
  } else if (key === 'Status') {
    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700 mb-1">Status</label>
        <select
          name={key}
          value={value}
          onChange={handleFormChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select Status</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
        </select>
      </div>
    );
  } else if (key === 'FuelType') {
    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700 mb-1">Fuel Type</label>
        <select
          name={key}
          value={value}
          onChange={handleFormChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
          <option value="LPG">LPG</option>
        </select>
      </div>
    );
  } else if (key === 'Transmission') {
    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700 mb-1">Transmission</label>
        <select
          name={key}
          value={value}
          onChange={handleFormChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="Semi-Automatic">Semi-Automatic</option>
          <option value="CVT">CVT</option>
        </select>
      </div>
    );
  } else {
    return (
      <div key={key} className="mb-4">
        <label className="block text-gray-700 mb-1">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
        <input
          type="text"
          name={key}
          value={value || ''}
          onChange={handleFormChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
    );
  }
})}

        <div className="col-span-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;

