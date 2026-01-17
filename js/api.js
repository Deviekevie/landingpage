// API Configuration - Reads from window.API_BASE_URL set by config.js
// For Vercel: Set API_BASE_URL environment variable (see README.md for instructions)
// For local dev: Automatically uses localhost:3000

const API_BASE_URL = (() => {
  // API_BASE_URL is set by config.js (loaded before this file)
  if (typeof window !== 'undefined' && window.API_BASE_URL) {
    return window.API_BASE_URL;
  }
  
  // Fallback: Detect localhost for development
  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname === '0.0.0.0'
  );
  
  // Production: API_BASE_URL must be set
  if (!isLocalhost) {
    const error = 'API_BASE_URL not configured. Set API_BASE_URL environment variable in Vercel dashboard.';
    console.error('API Configuration Error:', error);
    return null; // Will throw error in apiRequest
  }
  
  // Local development: Use localhost backend
  return 'http://localhost:3000';
})();

// Helper function for API requests with improved error handling
async function apiRequest(endpoint, options = {}) {
  if (!API_BASE_URL && endpoint.startsWith('/api/')) {
    const error = new Error('API_BASE_URL not configured. Please set API_BASE_URL environment variable in Vercel dashboard.');
    console.error('API Configuration Error:', error.message);
    throw error;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  // Remove Content-Type for FormData (handled automatically by browser)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  // Add authorization token if available
  const token = localStorage.getItem('adminToken');
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON but received ${contentType}. Response: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      const errorMessage = data.message || 
                          data.error || 
                          `HTTP error! status: ${response.status}`;
      
      // Provide helpful error messages
      if (response.status === 401) {
        throw new Error('Authentication required. Please log in.');
      } else if (response.status === 403) {
        throw new Error('Access denied. You do not have permission.');
      } else if (response.status === 404) {
        throw new Error(`API endpoint not found: ${endpoint}`);
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (response.status === 0 || response.type === 'opaque') {
        throw new Error('CORS error or network failure. Check API_BASE_URL configuration and CORS settings.');
      }
      
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Improve error messages for common issues
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      if (!API_BASE_URL) {
        const newError = new Error('API_BASE_URL not configured. Set API_BASE_URL in Vercel environment variables.');
        console.error('API Configuration Error:', newError.message);
        throw newError;
      }
      const newError = new Error(`Failed to connect to API at ${API_BASE_URL}. Check CORS settings and ensure backend is running.`);
      console.error('API Connection Error:', newError.message, error);
      throw newError;
    }
    
    console.error('API Request Error:', {
      endpoint,
      url,
      error: error.message,
      API_BASE_URL
    });
    throw error;
  }
}

// Reviews API
const reviewsAPI = {
  // Get all reviews
  async getAll() {
    try {
      const response = await apiRequest('/api/reviews');
      return response;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Submit a review
  async create(reviewData) {
    try {
      const response = await apiRequest('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData)
      });
      return response;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Get review statistics
  async getStats() {
    try {
      const response = await apiRequest('/api/reviews/stats');
      return response;
    } catch (error) {
      console.error('Error fetching review stats:', error);
      throw error;
    }
  }
};

// Projects API
const projectsAPI = {
  // Get all projects
  async getAll() {
    try {
      const response = await apiRequest('/api/projects');
      return response;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Create a project (admin only)
  async create(projectData) {
    try {
      const response = await apiRequest('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      });
      return response;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }
};

// Auth API
const authAPI = {
  // Admin login
  async login(email, password) {
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('adminToken', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await apiRequest('/api/auth/me');
      return response;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  },

  // Validate token
  async validate() {
    try {
      const response = await apiRequest('/api/auth/validate', {
        method: 'POST'
      });
      return response;
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('adminToken');
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('adminToken');
    return { success: true, message: 'Logged out successfully' };
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  }
};

// Upload API
const uploadAPI = {
  // Upload an image (admin only)
  async uploadImage(file) {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};

// Export API functions
window.API = {
  baseURL: API_BASE_URL,
  reviews: reviewsAPI,
  projects: projectsAPI,
  auth: authAPI,
  upload: uploadAPI
};
