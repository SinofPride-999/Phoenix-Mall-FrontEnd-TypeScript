// src/lib/api.ts
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important for sessions/cookies
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth API functions
export const authApi = {
  // Register user
  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  async login(credentials: { email: string; password: string }) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  async logout() {
    return apiRequest<{
      success: boolean;
      message: string;
    }>('/auth/logout', {
      method: 'POST',
    });
  },

  // Get current user
  async getCurrentUser() {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/auth/me');
  },
};

// Products API functions
export const productsApi = {
  // Get all products
  async getProducts(filters: any = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<{
      success: boolean;
      data: any[];
    }>(`/api/products?${queryParams}`);
  },

  // Get single product
  async getProduct(id: string) {
    return apiRequest<{
      success: boolean;
      data: any;
    }>(`/api/products/${id}`);
  },

  // Create product (for sellers)
  async createProduct(productData: any) {
    return apiRequest<{
      success: boolean;
      data: any;
    }>('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
};

// Utility function to handle API errors with toast notifications
export const handleApiError = (error: any, toast: any) => {
  console.error('API Error:', error);
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  });
};

// Profile API functions
export const profileApi = {
  // Get complete user profile
  async getProfile() {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/api/profile');
  },

  // Update profile information
  async updateProfile(profileData: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    date_of_birth?: string;
    gender?: string;
    bio?: string;
  }) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Update avatar
  async updateAvatar(avatarUrl: string) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/api/profile/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar_url: avatarUrl }),
    });
  },

  // Get all addresses
  async getAddresses() {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any[];
    }>('/api/profile/addresses');
  },

  // Get specific address
  async getAddress(id: number) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(`/api/profile/addresses/${id}`);
  },

  // Create new address
  async createAddress(addressData: {
    label: string;
    recipient_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    country: string;
    postal_code?: string;
    is_default?: boolean;
  }) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/api/profile/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },

  // Update address
  async updateAddress(id: number, addressData: {
    label?: string;
    recipient_name?: string;
    phone?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    is_default?: boolean;
  }) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(`/api/profile/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  },

  // Delete address
  async deleteAddress(id: number) {
    return apiRequest<{
      success: boolean;
      message: string;
    }>(`/api/profile/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  // Set default address
  async setDefaultAddress(id: number) {
    return apiRequest<{
      success: boolean;
      message: string;
    }>(`/api/profile/addresses/${id}/default`, {
      method: 'PATCH',
    });
  },

  // Get user settings
  async getSettings() {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/api/profile/settings');
  },

  // Update user settings
  async updateSettings(settingsData: {
    email_notifications?: boolean;
    sms_notifications?: boolean;
    newsletter_subscription?: boolean;
    two_factor_auth?: boolean;
    language?: string;
    currency?: string;
  }) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/api/profile/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },
};
