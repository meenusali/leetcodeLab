import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";
import ProblemPage from "./page/ProblemPage";
import Landingpage from "./page/Landingpage";
import ProfilePage from "./page/ProfilePage";
import ContestPage from "./page/contestPage";
import LeaderBoard from "./page/leaderBoard";
import Navbar from "./components/Navbar";
import EditProblem from "./page/EditProblem";
import ExplorePage from "./page/ExplorePage";


const App = () => {
  const { authUser, checkAuth, set } = useAuthStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  // Public routes that should redirect to home if authenticated
  const publicOnlyPaths = ['/login', '/signup', '/home'];
  const isPublicRoute = publicOnlyPaths.includes(location.pathname);

  useEffect(() => {
    const initAuth = async () => {
      const set = useAuthStore.getState;
      // Only check auth for protected routes
      if (!isPublicRoute) {
        try {
          await checkAuth();
        } catch (error) {
          set({ authUser: null });
        }
      }
      setIsInitialLoad(false);
    };
    initAuth();
  }, [checkAuth, isPublicRoute]);

  // Show loading only during initial auth check for protected routes
  if (isInitialLoad && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // If user is authenticated and tries to access public-only routes, redirect to home
  if (authUser && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  // If user is not authenticated and tries to access protected routes, redirect to home
  if (!authUser && !isPublicRoute) {
    const returnTo = encodeURIComponent(location.pathname);
    return <Navigate to={`/home?returnTo=${returnTo}`} replace  />;
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Show Navbar for all routes except landing page, login, and signup */}
      {!['/home', '/login', '/signup'].includes(location.pathname) && <Navbar />}
      
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>

      {/* Main content wrapper - adjust padding based on navbar presence */}
      <main className={`w-full ${['/home', '/login', '/signup'].includes(location.pathname) ? 'min-h-screen' : 'min-h-[calc(100vh-4rem)]'}`}>
        {/* Content container with consistent max-width */}
        <div className={`mx-auto ${['/login', '/signup'].includes(location.pathname) ? 'pt-12' : 'px-4 sm:px-6 lg:px-8 py-4'}`}>
          <div className={`mx-auto w-full ${
            location.pathname === '/login' || location.pathname === '/signup'
              ? 'max-w-md'
              : location.pathname === '/home'
              ? ''  // No max-width for landing page
              : 'max-w-7xl'
          }`}>
            <Routes>
              {/* Public routes - accessible when logged out */}
              <Route
                path="/home"
                element={<Landingpage />}
              />
              
              {/* Auth routes with narrower width */}
              <Route
                path="/login"
                element={
                  <div className="w-full p-6 bg-base-200 rounded-lg shadow-lg">
                    <LoginPage />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div className="w-full p-6 bg-base-200 rounded-lg shadow-lg">
                    <SignUpPage />
                  </div>
                }
              />

              {/* Protected routes with full width */}
              <Route
                path="/"
                element={authUser ? <HomePage /> : <Navigate to="/home" replace />}
              />
              
              <Route
                path="/explore"
                element={<ExplorePage />}
              />
              
              <Route
                path="/problem/:id"
                element={<ProblemPage />}
              />
              
              <Route
                path="/profile"
                element={<ProfilePage />}
              />
              
              <Route
                path="/contests"
                element={<ContestPage />}
              />
              
              <Route
                path="/leaderboard"
                element={<LeaderBoard />}
              />

              {/* Admin routes */}
              <Route element={<AdminRoute />}>
                <Route
                  path="/add-problem"
                  element={<AddProblem />}
                />
                <Route
                  path="/problem/edit/:id"
                  element={<EditProblem />}
                />
              </Route>

              {/* Catch all route - redirect to appropriate page based on auth status */}
              {/* <Route 
                path="*" 
                element={<Navigate to={authUser ? "/" : "/home"} replace />} 
              /> */}
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;