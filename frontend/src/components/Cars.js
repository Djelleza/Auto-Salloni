import React from 'react';
import kerri1 from '../assets/carPhoto/kerri1.png'; // Shto më shumë imazhe këtu

const Cars = () => {
  const carsData = [
    { id: 1, image: kerri1, year: 2020, mileage: '50,000 km', type: 'Used' },
    { id: 2, image: kerri1, year: 2019, mileage: '40,000 km', type: 'Used' },
    { id: 3, image: kerri1, year: 2021, mileage: '30,000 km', type: 'New' },
    { id: 4, image: kerri1, year: 2022, mileage: '20,000 km', type: 'New' },
    { id: 5, image: kerri1, year: 2023, mileage: '10,000 km', type: 'New' },
    { id: 6, image: kerri1, year: 2020, mileage: '60,000 km', type: 'Used' },
  ];

  const totalCars = carsData.length;
  const newCars = carsData.filter(car => car.type === 'New').length;
  const usedCars = carsData.filter(car => car.type === 'Used').length;

  return (
    <div className="bg-green-50 text-black">
      {/* Navbar */}
      <nav className="bg-black p-8 flex justify-around items-center relative z-10 rounded-b-lg max-w-5xl mx-auto px-25">
        <ul className="flex space-x-8">
          {['Marka', 'Modeli', 'Lloji i karburantit', 'Marshi', 'Ngjyra'].map((item) => (
            <li key={item} className="relative group text-white">
              {item}
              <i className="fas fa-chevron-down ml-2"></i>
              <ul className="absolute left-0 top-full hidden bg-gray-800 rounded shadow-lg group-hover:block z-20">
                {['Opsioni 1', 'Opsioni 2', 'Opsioni 3'].map((subItem) => (
                  <li key={subItem} className="px-4 py-2 hover:bg-green-400 cursor-pointer">
                    {subItem}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <button className="bg-green-400 px-4 py-2 rounded hover:bg-gray-500">Clear All</button>
          </li>
          <li>
            <button className="bg-green-400 px-4 py-2 rounded hover:bg-gray-500">Filter</button>
          </li>
        </ul>
      </nav>

      <div className="py-4 px-6 flex justify-start items-center text-xl font-semibold ml-[200px] space-x-8 mt-8">
        <span>Cars ({totalCars})</span>
        <span>New ({newCars})</span>
        <span>Used ({usedCars})</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20 py-8 mx-auto max-w-screen-xl mt-8">
        {carsData.map((car) => (
          <div
            key={car.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-center transform hover:scale-105 transition-transform duration-200"
          >
            <img
              src={car.image}
              alt={`Car ${car.id}`}
              className="w-full h-72 object-cover border-b-4 border-green-400"
            />
            <div className="p-4">
              <p className="text-base lg:text-lg font-semibold text-white">
                {car.year} | {car.mileage}
              </p>
              <button className="mt-4 bg-green-400 px-4 py-2 rounded hover:bg-green-300">
                Kontakto për çmimin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
