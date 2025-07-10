import axios from 'axios';

// Always use production backend for API requests
const API_BASE_URL = 'https://civchange-be-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.config?.url);
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface UploadResponse {
  jobId: string;
  message: string;
  fileName: string;
}

export interface ConversionJob {
  jobId: string;
  status: string;
  progress: number;
  fileName?: string;
  downloadUrl?: string;
  error?: string;
}

// Authentication interfaces
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
  };
}

export interface VerifyEmailRequest {
  code: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
}

// Authentication API functions
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const verifyEmail = async (data: VerifyEmailRequest): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/verifyEmail', data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/reset-password', data);
  return response.data;
};

export const resendVerification = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/resend-verification', data);
  return response.data;
};

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/auth/profile');
  return response.data.user;
};

export const updateProfile = async (data: { name: string }): Promise<UserProfile> => {
  const response = await api.put<UserProfile>('/auth/profile', data);
  return response.data;
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
  const response = await api.put('/auth/change-password', { currentPassword, newPassword });
  return response.data;
};

// File conversion API functions
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await api.post<UploadResponse>('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const startConversion = async (jobId: string): Promise<void> => {
  await api.post('/api/convert', { jobId });
};

export const getJobStatus = async (jobId: string): Promise<ConversionJob> => {
  const response = await api.get<ConversionJob>(`/api/job/${jobId}`);
  return response.data;
};

// Stripe Checkout API
export const createCheckoutSession = async (plan: 'basic' | 'pro' | 'premium'): Promise<{ url: string }> => {
  const response = await api.post<{ url: string }>('/api/payments/create-checkout', { plan });
  return response.data;
};

// Admin User Management interfaces
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface GetAllUsersResponse {
  users: AdminUser[];
  total: number;
}

export const getAllUsers = async (page = 1, search = ''): Promise<GetAllUsersResponse> => {
  const response = await api.get(`/admin/users?page=${page}&search=${encodeURIComponent(search)}`);
  // Defensive: default to [] and 0 if backend returns undefined
  return {
    users: response.data.users ?? [],
    total: response.data.total ?? 0,
  };
};

export const updateUser = async (id: string, data: Partial<AdminUser>): Promise<AdminUser> => {
  const response = await api.put(`/admin/users/${id}`, data);
  return response.data.user;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const createUser = async (data: Partial<AdminUser>): Promise<AdminUser> => {
  const response = await api.post('/admin/users', data);
  return response.data.user;
};

// Admin Settings interfaces
export interface Settings {
  conversionLimit: number;
  starterPrice: number;
  proPrice: number;
  businessPrice: number;
  // Add more fields as needed
}

export const getSettings = async (): Promise<Settings> => {
  const response = await api.get('/admin/settings');
  return response.data;
};

export const updateSettings = async (settings: Partial<Settings>): Promise<Settings> => {
  const response = await api.put('/admin/settings', settings);
  return response.data;
};

// User Account & Subscription API
export interface AccountInfo {
  plan: string;
  conversionsLeft: number;
  subscriptionStatus: string;
  subscriptionEndDate?: string;
  pendingPlan?: string;
}

export const getAccountInfo = async (): Promise<AccountInfo> => {
  const response = await api.get('/api/user/account');
  return response.data;
};

export const upgradeSubscription = async (plan: 'basic' | 'pro' | 'premium'): Promise<{ url: string }> => {
  const response = await api.post<{ url: string }>('/api/payments/upgrade', { plan });
  return response.data;
};

export const cancelSubscription = async (): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/api/payments/cancel-subscription');
  return response.data;
};

export default api; 