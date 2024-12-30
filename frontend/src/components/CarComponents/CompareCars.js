import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CompareCars = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [comparedCars, setComparedCars] = useState([]);

  useEffect(() => {
    const fetchComparedCars = async () => {
      try {
        const responses = await Promise.all(
          state.selectedCars.map((carId) => axios.get(`http://localhost:5001/api/cars/${carId}`))
        );
        setComparedCars(responses.map((res) => res.data));
      } catch (err) {
        console.error("Error fetching car details:", err);
      }
    };

    fetchComparedCars();
  }, [state.selectedCars]);

  return (
    <div className="compare-cars-container p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
      >
        Back to Search
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">
        Krahasoni ({comparedCars.length})
      </h1>

      
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="border border-white p-1"
                style={{ width: "100px" }}
              ></th>
              {comparedCars.map((car) => (
                <th
                  key={car.Id}
                  className="border border-white text-center"
                  style={{ width: "200px" }}
                >
                  {car.Brand} {car.Model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
           
            <tr>
              <td
                className="bg-gray-200 font-bold border border-white p-1"
                style={{ width: "100px" }}
              ></td>
              {comparedCars.map((car) => (
                <td
                  key={`${car.Id}-photo`}
                  className="border border-gray-300 p-1"
                  style={{ width: "200px" }}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://localhost:5001${car.Photo}`}
                      alt={`${car.Brand} ${car.Model}`}
                      className="w-48 h-36 object-cover rounded shadow-md"
                    />
                  </div>
                </td>
              ))}
            </tr>
            
            {[
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
            ].map((property) => (
              <tr key={property}>
                <td
                  className="bg-gray-200 font-bold border border-white p-1"
                  style={{ width: "100px" }}
                >
                  {property}
                </td>
                {comparedCars.map((car) => (
                  <td
                    key={`${car.Id}-${property}`}
                    className="border border-gray-300 p-1 text-center"
                    style={{ width: "200px" }}
                  >
                    {car[property]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareCars;
