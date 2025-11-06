import api from './api';

// Get auth configuration (strategy and OAuth config if applicable)
// Endpoint: GET /api/auth/config
// Response: { strategy: 'email' | 'oauth', oauth?: { authorizeUrl, clientId, redirectUri, scope } }
export const getAuthConfig = async () => {
  try {
    const response = await api.get('/api/auth/config', {
      timeout: 2000, // 2 second timeout
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching auth config:', error);
    // If backend is not available, throw error so AuthContext can default to 'email'
    throw new Error(error?.response?.data?.message || error.message || 'Backend unavailable');
  }
};

// Description: Login user functionality (email/password)
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: User fields spread at root level + { accessToken: string, refreshToken: string }
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Register user functionality
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string, role?: string }
// Response: { email: string }
export const register = async (email: string, password: string, role?: string) => {
  try {
    const response = await api.post('/api/auth/register', {email, password, role});
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Logout
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { success: boolean, message: string }
export const logout = async () => {
  try {
    return await api.post('/api/auth/logout');
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
