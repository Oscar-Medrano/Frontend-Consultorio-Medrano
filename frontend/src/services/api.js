import axios from 'axios';

const API_BASE_URL = 'https://consultorio-medrano-api.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT a las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    }
    return Promise.reject(error);
  }
);

// Servicios públicos
export const publicService = {
  getHealth: () => apiClient.get('/health'),
  getDisponibilidad: (fecha) => apiClient.get(`/api/v1/disponibilidad?fecha=${fecha}`),
  crearCita: (citaData) => apiClient.post('/api/v1/citas', citaData),
};

// Servicios de autenticación
export const authService = {
  login: (password) => apiClient.post('/api/v1/admin/login', { password }),
};

// Servicios protegidos
export const citasService = {
  getCitas: () => apiClient.get('/api/v1/citas'),
  getCita: (id) => apiClient.get(`/api/v1/citas/${id}`),
  confirmarCita: (id) => apiClient.put(`/api/v1/citas/${id}/confirmar`),
  cancelarCita: (id) => apiClient.put(`/api/v1/citas/${id}/cancelar`),
  deleteCita: (id) => apiClient.delete(`/api/v1/citas/${id}`),
};

export const statsService = {
  getStats: () => apiClient.get('/api/v1/stats'),
};

// Export por defecto con todas las funciones
const api = {
  getHealth: () => apiClient.get('/health'),
  getDisponibilidad: (fecha) => apiClient.get(`/api/v1/disponibilidad?fecha=${fecha}`),
  createAppointment: (citaData) => apiClient.post('/api/v1/citas', citaData),
  login: (password) => apiClient.post('/api/v1/admin/login', { password }),
  getCitas: () => apiClient.get('/api/v1/citas'),
  getCita: (id) => apiClient.get(`/api/v1/citas/${id}`),
  confirmarCita: (id) => apiClient.put(`/api/v1/citas/${id}/confirmar`),
  cancelarCita: (id) => apiClient.put(`/api/v1/citas/${id}/cancelar`),
  deleteCita: (id) => apiClient.delete(`/api/v1/citas/${id}`),
  getStats: () => apiClient.get('/api/v1/stats'),
};

export default api;
