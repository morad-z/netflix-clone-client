// This file is deprecated and should not be used
// All ProtectedRoute functionality has been moved to protected-route.jsx
// This file is kept for reference only

// Uncomment if you need to use this version instead of the JSX version
/*
import { Route, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!user) {
    setLocation("/auth");
    return null;
  }

  return <Route {...rest} component={Component} />;
}

export function AdminRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!user || !user.isAdmin) {
    setLocation("/");
    return null;
  }

  return <Route {...rest} component={Component} />;
}
*/
