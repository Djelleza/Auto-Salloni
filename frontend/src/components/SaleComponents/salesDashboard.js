import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSales, deleteSale } from "../../api/saleApi";

const SalesDashboard = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sales = await fetchSales();
        setSales(sales);
        setError('');
      } catch (err) {
        setError("Failed to fetch sales.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteSale = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this sale?');
    if (isConfirmed) {
      try {
        await deleteSale(id);
        setSales((prevSales) => prevSales.filter((sale) => sale.Id !== id));
        alert('Sale deleted successfully.');
      } catch (err) {
        console.error('Error deleting sale:', err);
        alert('Failed to delete sale. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading sales...</div>
      </div>
    );
  }

  const tableHeaders = [
    "Sale ID",
    "Car ID",
    "Sale Date",
    "Sale Price",
    "Customer Name",
    "Customer Email",
    "Actions"
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link
          to="/add-sale"
          className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
        >
          Add Sale
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
            {sales.map((sale) => (
              <tr key={sale.Id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{sale.Id}</td>
                <td className="border px-4 py-2">{sale.CarId}</td>
                <td className="border px-4 py-2">{sale.SaleDate}</td>
                <td className="border px-4 py-2">{sale.SalePrice}</td>
                <td className="border px-4 py-2">{sale.CustomerName}</td>
                <td className="border px-4 py-2">{sale.CustomerEmail}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-sale/${sale.Id}`}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteSale(sale.Id)}
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

export default SalesDashboard;
