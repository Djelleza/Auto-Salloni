const BASE_URL = 'http://localhost:5001/api/cars';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null); 
    const errorMessage = errorData?.message || `HTTP error! Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return await response.json();
};

// Fetch all cars
export const fetchCars = async () => {
  try {
    console.log("Fetching cars from:", BASE_URL);
    const response = await fetch(BASE_URL);
    return await handleResponse(response);
  } catch (err) {
    console.error("Error fetching cars:", err);
    return [];
  }
};

// Fetch car by ID
export const fetchCarById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (err) {
    console.error(`Error fetching car with ID ${id}:`, err);
    throw err;
  }
};

// Add a new car
export const addCar = async (carData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: carData, 
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("Error adding car:", err);
    throw err;
  }
};

// Update car details
export const updateCar = async (id, updatedFields) => {
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
    console.error(`Error updating car with ID ${id}:`, err);
    throw err;
  }
};

// Delete a car
export const deleteCar = async (id) => {
  try {
    console.log("Deleting car with ID:", id);
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    return await handleResponse(response);
  } catch (err) {
    console.error(`Error deleting car with ID ${id}:`, err);
    throw err;
  }
};

// Fetch available filters
export const fetchFilters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/filters`);
    return await handleResponse(response);
  } catch (err) {
    console.error("Error fetching filters:", err);
    throw err;
  }
};
