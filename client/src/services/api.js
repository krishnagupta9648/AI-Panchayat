import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied via Vite config to avoid CORS
});

// Interceptor to automatically add societyCode to every outgoing request
api.interceptors.request.use((config) => {
  try {
    const saved = localStorage.getItem('ai_panchayat_user');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.societyCode) {
        config.headers['x-society-code'] = user.societyCode;
      }
    }
  } catch (e) {
    console.error('Failed to parse user for api interceptor', e);
  }
  return config;
}, (error) => Promise.reject(error));

export const authService = {
  login: (phone, societyCode) => api.post('/auth/login', { phone, societyCode }),
  register: (data) => api.post('/auth/register', data)
};

export const complaintService = {
  getAll: () => api.get('/complaints'),
  create: (complaint) => api.post('/complaints', complaint),
};

export const aiService = {
  getSummary: (messages) => api.post('/ai/summary', { messages }),
  askBylaw: (question) => api.post('/ai/bylaw', { question }),
  processVoice: (audioBlob) => api.post('/ai/voice', audioBlob),
};

export const accountService = {
  getStats: () => api.get('/accounts'),
};
