const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://digital-skills-platform.onrender.com/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      console.log("Making API request to:", url);

      const response = await fetch(url, config);

      // Handle 204 No Content responses
      if (response.status === 204) {
        return { success: true };
      }

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const error = new Error(
          data.error || data.message || `HTTP error! status: ${response.status}`
        );
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);

      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        const networkError = new Error(
          "Network error: Unable to connect to the server. Please check if the backend is running."
        );
        networkError.code = "NETWORK_ERROR";
        throw networkError;
      }

      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: userData,
    });
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: credentials,
    });
  }

  async verifyEmail(verificationData) {
    return this.request("/auth/verify-email", {
      method: "POST",
      body: verificationData,
    });
  }

  async resendVerification(email) {
    return this.request("/auth/resend-verification", {
      method: "POST",
      body: { email },
    });
  }

  async completeProfile(profileData, token) {
    return this.request("/auth/complete-profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: profileData,
    });
  }

  async getCurrentUser(token) {
    return this.request("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async logout(token) {
    return this.request("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Health check
  async healthCheck() {
    return this.request("/health");
  }

  // Captive portal check
  async captiveCheck() {
    return this.request("/captive/check");
  }
}

export const apiService = new ApiService();
