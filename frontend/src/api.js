import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log('API URL:', API_URL); // Debug log

// Create API instance
let apiInstance = null;

const getApi = async () => {
  if (!apiInstance) {
    try {
      console.log('Creating new API instance with URL:', API_URL);

      apiInstance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Add a request interceptor to add the auth token to requests
      apiInstance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          console.log('Making request to:', config.url, 'with headers:', config.headers);
          return config;
        },
        (error) => {
          console.error('Request interceptor error:', error);
          return Promise.reject(error);
        }
      );

      // Add a response interceptor to handle errors
      apiInstance.interceptors.response.use(
        (response) => {
          console.log('Response received:', response.status, response.data);
          return response;
        },
        (error) => {
          console.error('API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
          });
          return Promise.reject(error);
        }
      );
    } catch (error) {
      console.error('Error creating API instance:', error);
      throw error;
    }
  }
  return apiInstance;
};

// Export API functions
export const login = async (credentials) => {
  const api = await getApi();
  return api.post('/users/login', credentials);
};

export const register = async (userData) => {
  const api = await getApi();
  return api.post('/users/register', userData);
};

// Invitation-related API calls
export const generateInvitation = async () => {
  const api = await getApi();
  return api.post('/invitations/generate');
};

export const validateInvitation = async (code) => {
  const api = await getApi();
  return api.post('/invitations/validate', { code });
};

export const useInvitation = async (code) => {
  const api = await getApi();
  return api.post('/invitations/use', { code });
};

// Hospital-related API calls
export const getAllHospitals = async () => {
  const api = await getApi();
  return api.get('/hospitals/all');
};

export const getHospitals = async (city) => {
  const api = await getApi();
  return api.get(`/hospitals/city?city=${city}`);
};

export const getHospital = async (id) => {
  const api = await getApi();
  return api.get(`/hospitals/${id}`);
};

export const createHospital = async (hospitalData) => {
  const api = await getApi();
  return api.post('/hospitals', hospitalData);
};

export const updateHospital = async (id, hospitalData) => {
  const api = await getApi();
  return api.put(`/hospitals/${id}`, hospitalData);
};

export const deleteHospital = async (id) => {
  const api = await getApi();
  return api.delete(`/hospitals/${id}`);
};

export default getApi; 