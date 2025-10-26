// import { AuthService } from './auth'

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// export interface ApiResponse<T = any> {
//   success: boolean
//   message?: string
//   data?: T
//   error?: string
// }

// class ApiClient {
//   private baseURL: string

//   constructor(baseURL: string = API_BASE_URL) {
//     this.baseURL = baseURL
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<ApiResponse<T>> {
//     try {
//       const url = `${this.baseURL}${endpoint}`
//       const config: RequestInit = {
//         ...options,
//         headers: {
//           ...AuthService.getAuthHeaders(),
//           ...options.headers,
//         },
//       }

//       const response = await fetch(url, config)
//       const data = await response.json()

//       if (response.status === 401) {
//         AuthService.logout()
//         throw new Error('Unauthorized')
//       }

//       return {
//         success: response.ok,
//         data: response.ok ? data : undefined,
//         error: response.ok ? undefined : data.message || 'Request failed',
//         message: data.message,
//       }
//     } catch (error) {
//       console.error('API request error:', error)
//       return {
//         success: false,
//         error: error instanceof Error ? error.message : 'Network error',
//       }
//     }
//   }

//   async get<T>(endpoint: string): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { method: 'GET' })
//   }

//   async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, {
//       method: 'POST',
//       body: data ? JSON.stringify(data) : undefined,
//     })
//   }

//   async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, {
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : undefined,
//     })
//   }

//   async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
//     return this.request<T>(endpoint, { method: 'DELETE' })
//   }
// }

// export const apiClient = new ApiClient()

// // Specific API functions
// export const adminApi = {
//   // Users
//   getUsers: () => apiClient.get('/api/admin/users'),
//   createUser: (userData: { name?: string; email: string; password: string; role: string }) =>
//     apiClient.post('/api/admin/users', userData),
//   deleteUser: (id: number) => apiClient.delete(`/api/admin/users/${id}`),

//   // Contacts
//   getContacts: () => apiClient.get('/api/admin/contacts'),
//   deleteContact: (id: number) => apiClient.delete(`/api/admin/contacts/${id}`),
// }




import { AuthService } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        ...options,
        headers: {
          ...AuthService.getAuthHeaders(),
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (response.status === 401) {
        AuthService.logout();
        throw new Error("Unauthorized");
      }

      return {
        success: response.ok,
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : data.message || "Request failed",
        message: data.message,
      };
    } catch (error) {
      console.error("API request error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();

// Specific API functions
export const adminApi = {
  // Users
  getUsers: () => apiClient.get("/api/admin/users"),
  createUser: (userData: { name?: string; email: string; password: string; role: string }) =>
    apiClient.post("/api/admin/users", userData),
  deleteUser: (id: number) => apiClient.delete(`/api/admin/users/${id}`),

  // Contacts
  getContacts: () => apiClient.get("/api/admin/contacts"),
  deleteContact: (id: number) => apiClient.delete(`/api/admin/contacts/${id}`),

  // Subscribers
  getSubscribers: () => apiClient.get("/api/newsletter/subscribers"),
  deleteSubscriber: (id: number) => apiClient.delete(`/api/newsletter/subscribe/${id}`),

  // Blog (new)
getBlogPosts: () => apiClient.get("/api/blog/posts"),
createBlogPost: (postData: { title: string; content: string }) => apiClient.post("/api/blog/posts", postData),
updateBlogPost: (id: number, postData: { title: string; content: string }) => apiClient.put(`/api/blog/posts/${id}`, postData),
deleteBlogPost: (id: number) => apiClient.delete(`/api/blog/posts/${id}`),

};