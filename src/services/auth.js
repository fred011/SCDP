import { apiService } from './api';
 
class AuthService {
  // Token management
  getToken() {
    return localStorage.getItem('authToken');
  }
 
  setToken(token) {
    localStorage.setItem('authToken', token);
  }
 
  removeToken() {
    localStorage.removeItem('authToken');
  }
 
  // User management
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
 
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
 
  removeUser() {
    localStorage.removeItem('user');
  }
 
  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
 
  // Check if user profile is complete
  isProfileComplete() {
    const user = this.getUser();
    return user?.profileComplete || false;
  }
 
  // Check if user is verified
  isVerified() {
    const user = this.getUser();
    return user?.isVerified || false;
  }
 
  // Main authentication methods
  async register(userData) {
    try {
      const response = await apiService.register(userData);
      
      if (response.token) {
        this.setToken(response.token);
        this.setUser(response.user);
      }
      
      return response;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }
 
  async login(credentials) {
    try {
      const response = await apiService.login(credentials);
      
      this.setToken(response.token);
      this.setUser(response.user);
      
      return response;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }
 
  async verifyEmail(email, code) {
    try {
      const response = await apiService.verifyEmail({ email, code });
      
      this.setToken(response.token);
      this.setUser(response.user);
      
      return response;
    } catch (error) {
      throw error;
    }
  }
 
  async resendVerification(email) {
    return await apiService.resendVerification(email);
  }
 
  async completeProfile(profileData) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
 
    const response = await apiService.completeProfile(profileData, token);
    
    // Update user data
    this.setUser(response.user);
    
    return response;
  }
 
  async getCurrentUser() {
    const token = this.getToken();
    if (!token) throw new Error('No authentication token');
    
    const response = await apiService.getCurrentUser(token);
    this.setUser(response.user);
    
    return response;
  }
 
  async logout() {
    try {
      const token = this.getToken();
      if (token) {
        await apiService.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }
 
  // Clear all auth data
  clearAuth() {
    this.removeToken();
    this.removeUser();
  }
 
  // Get auth headers for API calls
  getAuthHeaders() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}
 
export const authService = new AuthService();
 