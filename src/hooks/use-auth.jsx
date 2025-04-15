import { createContext, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { toast } = useToast();

  const {
    data: user,
    error,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: 30000, // Cache for 30 seconds
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      console.log("Logging in with credentials:", { ...credentials, password: "[REDACTED]" });
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: async (user) => {
      console.log("Login successful:", user);
      
      // Update the query cache
      queryClient.setQueryData(["/api/user"], user);

      // Show success toast
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${user.username}!`,
      });

      // Clear any existing profile data
      localStorage.removeItem("hasActiveProfile");
      localStorage.removeItem("activeProfileId");
      
      try {
        // Check if user has any profiles
        const response = await apiRequest("GET", "/api/profiles");
        const profiles = await response.json();
        
        console.log("Fetched profiles after login:", profiles);
        
        // If user has no profiles, redirect to profile page to create one
        // Otherwise, redirect to profile selection
        setTimeout(() => {
          window.location.replace("/profile");
        }, 500);
      } catch (error) {
        console.error("Error checking profiles:", error);
        // On error, still redirect to profile page
        setTimeout(() => {
          window.location.replace("/profile");
        }, 500);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials) => {
      console.log("Registering with credentials:", { ...credentials, password: "[REDACTED]" });
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (user) => {
      console.log("Registration successful:", user);
      
      // Clear any existing profile data
      localStorage.removeItem("hasActiveProfile");
      localStorage.removeItem("activeProfileId");
      
      // Show success message
      toast({
        title: "Registration successful",
        description: "Account created successfully! Please log in.",
      });
      
      // Redirect to login page
      console.log("Redirecting to login page after registration");
      window.location.href = "/auth";
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      console.log("Logging out...");
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      console.log("Logout successful");
      
      // Clear all profile data from localStorage
      localStorage.removeItem("hasActiveProfile");
      localStorage.removeItem("activeProfileId");

      // Clear React Query cache
      queryClient.setQueryData(["/api/user"], null);
      queryClient.clear();

      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });

      // Redirect to auth page
      window.location.href = "/auth";
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });

      // Even if the server logout fails, still clear local state and redirect
      localStorage.removeItem("hasActiveProfile");
      localStorage.removeItem("activeProfileId");
      queryClient.setQueryData(["/api/user"], null);
      window.location.href = "/auth";
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
