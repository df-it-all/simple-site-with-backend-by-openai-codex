const API_BASE = import.meta.env?.VITE_API_BASE || '/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const message = (await response.json().catch(() => ({}))).message || '伺服器錯誤';
    throw new Error(message);
  }

  return response.json();
};

export const login = (payload) => request('/login', {
  method: 'POST',
  body: JSON.stringify(payload)
});

export const getProfile = (token) =>
  request('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getAbout = () => request('/about');
