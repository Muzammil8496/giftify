const API_BASE_URL = 'http://localhost:5000/api';

export const registerAPI = async (name, email, password, phone = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phone }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
};