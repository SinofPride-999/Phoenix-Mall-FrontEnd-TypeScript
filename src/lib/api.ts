// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get the token from localStorage
  const token = localStorage.getItem('access_token');

  console.log('🔧 Making API request to:', url);
  console.log('🔑 Token present:', !!token);
  console.log('📦 Request method:', options.method || 'GET');

  // Set up headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    headers,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    console.log('🔧 Response status:', response.status);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Server returned non-JSON response: ${text}`);
    }

    const data = await response.json();

    if (!response.ok) {
      // For 422 errors, include validation errors in the message
      if (response.status === 422 && data.errors) {
        const validationErrors = Object.values(data.errors).flat().join(', ');
        throw new Error(`Validation failed: ${validationErrors}`);
      }
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('❌ API request failed:', error);
    throw error;
  }
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
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        user: any;
        access_token: string;
        token_type: string;
      };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Store the token after successful registration
    if (response.success && response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }

    return response;
  },

  // Login user
  async login(credentials: { email: string; password: string }) {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        user: any;
        access_token: string;
        token_type: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store the token after successful login
    if (response.success && response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }

    return response;
  },

  // Logout user
  async logout() {
    const response = await apiRequest<{
      success: boolean;
      message: string;
    }>('/auth/logout', {
      method: 'POST',
    });

    // Remove the token after logout (even if API call fails)
    localStorage.removeItem('access_token');

    return response;
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
    }>(`/products?${queryParams}`);
  },

  // Get single product
  async getProduct(id: string) {
    return apiRequest<{
      success: boolean;
      data: any;
    }>(`/products/${id}`);
  },

  // Create product (for sellers)
  async createProduct(productData: any) {
    return apiRequest<{
      success: boolean;
      data: any;
    }>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
};

// Utility function to handle API errors with toast notifications
export const handleApiError = (error: any, toast: any) => {
  console.error('API Error:', error);

  // Extract a user-friendly error message
  let errorMessage = error.message || "Something went wrong";

  // If it's a validation error, make it more readable
  if (errorMessage.includes('Validation failed:')) {
    errorMessage = errorMessage.replace('Validation failed:', 'Please check your input:');
  }

  toast({
    title: "Error",
    description: errorMessage,
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
    }>('/profile');
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
    }>('/profile', {
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
    }>('/profile/avatar', {
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
    }>('/profile/addresses');
  },

  // Get specific address
  async getAddress(id: number) {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(`/profile/addresses/${id}`);
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
    }>('/profile/addresses', {
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
    }>(`/profile/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  },

  // Delete address
  async deleteAddress(id: number) {
    return apiRequest<{
      success: boolean;
      message: string;
    }>(`/profile/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  // Set default address
  async setDefaultAddress(id: number) {
    return apiRequest<{
      success: boolean;
      message: string;
    }>(`/profile/addresses/${id}/default`, {
      method: 'PATCH',
    });
  },

  // Get user settings
  async getSettings() {
    return apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>('/profile/settings');
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
    }>('/profile/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },
};
