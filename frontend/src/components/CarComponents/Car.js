import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../../api/carApi"; 

const Car = () => {
  const { id } = useParams(); 
  const [car, setCar] = useState(null);

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        const data = await fetchCarById(id); 
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    getCarDetails();
  }, [id]);

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-full max-w-[95%] min-h-[500px]">
        
        <div className="w-1/2">
          <img
            src={`http://localhost:5001${car.Photo}`} 
            alt={`Car ${car.Id}`} 
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="w-1/2 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{car.Model}</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-lg text-gray-700">
            <span className="font-semibold">Brand:</span>
            <span>{car.Brand || "Unknown"}</span>

            <span className="font-semibold">Model:</span>
            <span>{car.Model}</span>

            <span className="font-semibold">Type:</span>
            <span>{car.Type || "Unknown"}</span>

            <span className="font-semibold">Year:</span>
            <span>{car.Year}</span>

            <span className="font-semibold">Mileage:</span>
            <span>{car.Mileage}</span>

            <span className="font-semibold">Engine Size:</span>
            <span>{car.EngineSize || "Unknown"}</span>

            <span className="font-semibold">Fuel Type:</span>
            <span>{car.FuelType}</span>

            <span className="font-semibold">Color:</span>
            <span>{car.Color}</span>

            <span className="font-semibold">Stock:</span>
            <span>{car.Stock}</span>

            <span className="font-semibold">Transmission:</span>
            <span>{car.Transmission}</span>

            <span className="font-semibold">Doors:</span>
            <span>{car.Doors || "Unknown"}</span>
          </div>
          <div className="mt-6">
            <span className="inline-block px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md cursor-default">
              Contact for price
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
