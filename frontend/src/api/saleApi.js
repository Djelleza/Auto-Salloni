const BASE_URL = 'http://localhost:5001/api/sales';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null); 
    const errorMessage = errorData?.message || `HTTP error! Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return await response.json();
};

// Fetch all sales
export const fetchSales = async () => {
  try {
    console.log("Fetching sales from:", BASE_URL);
    const response = await fetch(BASE_URL);
    return await handleResponse(response);
  } catch (err) {
    console.error("Error fetching sales:", err);
    return [];
  }
};

// Fetch sale by ID
export const fetchSaleById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (err) {
    console.error(`Error fetching sale with ID ${id}:`, err);
    throw err;
  }
};

// Add a new sale
export const addSale = async (saleData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("Error adding sale:", err);
    throw err;
  }
};

// Update sale 
export const updateSale = async (id, updatedFields) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    return await handleResponse(response);
  } catch (err) {
    console.error(`Error updating sale with ID ${id}:`, err);
    throw err;
  }
};

// Delete a sale
export const deleteSale = async (id) => {
  try {
    console.log("Deleting sale with ID:", id);
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    return await handleResponse(response);
  } catch (err) {
    console.error(`Error deleting sale with ID ${id}:`, err);
    throw err;
  }
};
