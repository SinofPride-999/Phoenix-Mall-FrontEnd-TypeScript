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
