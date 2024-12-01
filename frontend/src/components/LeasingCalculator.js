import React, { useState } from "react";

const LeasingCalculator = () => {
  const [price, setPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");
  const [downPayment, setDownPayment] = useState("");

  const calculateLoan = () => {
    const amount = price - downPayment;
    const rate = interestRate / 100;
    const monthlyPayment =
      (amount * rate * Math.pow(1 + rate, duration)) /
      (Math.pow(1 + rate, duration) - 1);
    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Leasing Calculator</h1>
      <p className="text-gray-600 mb-6">
        Use our calculator to estimate your payment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Interest Rate (%) *</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter interest rate"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (Months) *</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter duration"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Advance Payment *</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter down payment"
          />
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
        Calculate Payment
      </button>
      <div className="results mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Results:</h3>
        <p className="text-lg text-gray-700">Monthly Payment: €{calculateLoan()}</p>
      </div>
    </div>
  );
};

export default LeasingCalculator;
