import { Switch, Route } from "wouter";

import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import ProfilePage from "@/pages/profile-page";
import MoviesPage from "@/pages/movies-page";
import TVShowsPage from "@/pages/tv-shows-page";
import NewPopularPage from "@/pages/new-popular-page";
import MyListPage from "@/pages/my-list-page";
import SearchPage from "@/pages/search-page";
import ReviewPage from "@/pages/review-page";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import ContentForm from "@/pages/admin/content-form";
import ProtectedRoute, { AdminRoute } from "./lib/protected-route.jsx";

function Router() {
  return (
    <Switch>
      <Route path="/auth">
        <ProtectedRoute requireAuth={false} requireProfile={false}>
          <AuthPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/profile">
        <ProtectedRoute requireAuth={true} requireProfile={false}>
          <ProfilePage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <HomePage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/movies">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <MoviesPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/tvshows">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <TVShowsPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/new-popular">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <NewPopularPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/my-list">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <MyListPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/search">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <SearchPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/review/:type/:id">
        <ProtectedRoute requireAuth={true} requireProfile={true}>
          <ReviewPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin">
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </Route>
      
      <Route path="/admin/add-content">
        <AdminRoute>
          <ContentForm />
        </AdminRoute>
      </Route>
      
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
