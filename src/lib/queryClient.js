import { QueryClient } from "@tanstack/react-query";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export async function apiRequest(method, endpoint, data = null) {
  const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  console.log(`Making ${method} request to ${fullUrl}`, data);

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
    },
    credentials: 'include', // Important for cookies
    mode: "cors"
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, options);
    
    if (!response.ok) {
      const errorText = (await response.text()) || response.statusText;
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`${response.status}: ${errorText}`);
    }
    
    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

export const getQueryFn =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0];
    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;
    const res = await apiRequest('GET', fullUrl);

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
      cacheTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Ensure the QueryClient is extensible
Object.defineProperty(queryClient, "current", {
  value: queryClient,
  writable: true,
  configurable: true,
  enumerable: true,
});
