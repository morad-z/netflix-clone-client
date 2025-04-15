import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";
import { useState, useEffect, useCallback } from "react";

export default function ProtectedRoute({ children, requireAuth = true, requireProfile = true }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // Query for active profile
  const { 
    data: activeProfileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ["/api/profiles/active"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/profiles/active");
        const data = await response.json();
        console.log("Active profile data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching active profile:", error);
        return null;
      }
    },
    enabled: !!user && requireProfile, // Only run if we have a user and need a profile
    retry: 2, // Retry twice
    retryDelay: 1000, // Wait 1 second between retries
    staleTime: 30000, // Cache for 30 seconds
  });

  useEffect(() => {
    console.log("ProtectedRoute - State:", { 
      user: !!user, 
      isAuthLoading, 
      requireAuth,
      requireProfile,
      hasActiveProfile: !!activeProfileData,
      isProfileLoading,
      currentPath: window.location.pathname,
      activeProfileData
    });

    // Don't do anything until auth is loaded
    if (isAuthLoading) {
      console.log("ProtectedRoute - Auth still loading, waiting...");
      return;
    }

    // Case 1: Require auth but no user
    if (requireAuth && !user) {
      console.log("ProtectedRoute - No user, redirecting to auth");
      // Use replace to avoid browser history issues
      if (window.location.pathname !== "/auth") {
        window.location.replace("/auth");
      }
      return;
    }

    // Case 2: Require profile but profile data still loading
    if (requireProfile && isProfileLoading && user) {
      console.log("ProtectedRoute - Profile still loading, waiting...");
      return;
    }

    // Case 3: Require profile but no active profile
    if (requireProfile && user && !activeProfileData && !isProfileLoading) {
      console.log("ProtectedRoute - No active profile, redirecting to profile page");
      // Use replace to avoid browser history issues
      if (window.location.pathname !== "/profile") {
        window.location.replace("/profile");
      }
      return;
    }

    // Case 4: On auth page but already logged in
    if (!requireAuth && user) {
      // Check if we have an active profile
      const hasActiveProfile = !!activeProfileData;
      
      if (hasActiveProfile) {
        console.log("ProtectedRoute - User logged in with active profile, redirecting to home");
        // Use replace to avoid browser history issues
        if (window.location.pathname !== "/") {
          window.location.replace("/");
        }
      } else if (!isProfileLoading) {
        console.log("ProtectedRoute - User logged in without active profile, redirecting to profile page");
        // Use replace to avoid browser history issues
        if (window.location.pathname !== "/profile") {
          window.location.replace("/profile");
        }
      }
      return;
    }

    // If we get here, we're good to render the children
    console.log("ProtectedRoute - All checks passed, rendering children");
    setIsReady(true);
  }, [
    user, 
    isAuthLoading, 
    requireAuth, 
    requireProfile, 
    activeProfileData, 
    isProfileLoading
  ]);

  // Show loading state until we're ready
  if (!isReady) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we get here, we're good to render the children
  return children;
}

export function AdminRoute({ children }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    console.log("AdminRoute - State:", {
      user,
      isAuthLoading,
      userRole: user?.role
    });

    // Don't do anything until auth is loaded
    if (isAuthLoading) {
      return;
    }

    // If not logged in, redirect to auth
    if (!user) {
      console.log("AdminRoute - Not logged in, redirecting to auth");
      setLocation("/auth");
      return;
    }

    // Check if user is admin
    if (user && !user.isAdmin) {
      console.log("User is not admin, redirecting to home");
      setLocation("/");
      return;
    }

    // If we get here, user is admin
    console.log("AdminRoute - User is admin, rendering");
    setIsReady(true);
  }, [user, isAuthLoading, setLocation]);

  // Show loading state until we're ready
  if (!isReady) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we get here, we're good to render the children
  return children;
}
