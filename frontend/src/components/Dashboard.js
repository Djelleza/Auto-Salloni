import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCars, deleteCar } from "../api/carApi";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading,setLoading]= useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cars = await fetchCars();
        setCars(cars);
        setError('');
      } catch (err) {
        setError("Failed to fetch cars.");
        console.error(err);
      } finally{
        setLoading(false);      }
    };
    fetchData();
  }, []);

  const handleDeleteCar = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this car?');
    if (isConfirmed) {
      try {
        await deleteCar(id);
        setCars((prevCars) => prevCars.filter((car) => car.Id !== id));
        alert('Car deleted successfully.');
      } catch (err) {
        console.error('Error deleting car:', err);
        alert('Failed to delete car. Please try again.');
      }
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading cars...</div>
      </div>
    );
  }

  const tableHeaders = [
    "ID",
    "Brand",
    "Model",
    "Type",
    "Year",
    "Mileage",
    "EngineSize",
    "FuelType",
    "Color",
    "Stock",
    "Transmission",
    "Doors",
    "Status",
    "Price",
    "Photo",
    "Actions",
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link
          to="/add-car"
          className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
        >
          Add+
        </Link>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {tableHeaders.map((header) => (
                <th key={header} className="px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.Id} className="hover:bg-gray-100">
                {Object.entries(car).map(([key, value]) => {
                  if (key === "Photo") {
                    return (
                      <td key={key} className="border px-4 py-2">
                        <img
                          src={`http://localhost:5001${value}`}
                          alt="Car"
                          className="h-13 w-32 object-cover mx-auto"
                        />
                      </td>
                    );
                  }
                  return (
                    <td key={key} className="border px-4 py-2">
                      {value}
                    </td>
                  );
                })}
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-car/${car.Id}`}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteCar(car.Id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
