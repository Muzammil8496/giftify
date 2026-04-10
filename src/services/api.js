const API_BASE_URL = 'http://localhost:5000/api';

// ─── Auth helpers ─────────────────────────────────────────────────────────

const getToken = () => localStorage.getItem('token') || '';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ─── Auth ─────────────────────────────────────────────────────────────────

export const registerAPI = async (name, email, password, phone = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    });
    return await response.json();
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

// ─── Profile ──────────────────────────────────────────────────────────────

/**
 * TICKET-005 — Update profile (name, phone, gender, dob)
 */
export const updateProfileAPI = async ({ name, phone, gender, dob }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ name, phone, gender, dob }),
    });
    return await response.json();
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * TICKET-007 — Change password
 */
export const changePasswordAPI = async (currentPassword, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return await response.json();
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

/**
 * TICKET-006 — Upload avatar
 */
export const uploadAvatarAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_BASE_URL}/auth/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` }, // no Content-Type — browser sets multipart boundary
      body: formData,
    });
    return await response.json();
  } catch {
    return { success: false, message: 'Upload failed. Please try again.' };
  }
};