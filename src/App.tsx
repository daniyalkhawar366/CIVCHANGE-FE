import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './components/auth/Profile';
import Admin from './components/Admin';
import Contact from './components/Contact';
import ThankYou from './components/ThankYou';
import NotFound from './components/NotFound';
import VerifyResetOtp from './components/auth/VerifyResetOtp';

function AppRoutes() {
  const { isAdmin } = useAuth();
  return (
    <Routes>
      {/* Admin-only: If admin, redirect all to /admin except /admin itself */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <Admin />
        </ProtectedRoute>
      } />
      {isAdmin ? (
        <Route path="*" element={<Navigate to="/admin" replace />} />
      ) : (
        <>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navigation />
              <LandingPage />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navigation />
              <Contact />
              <Footer />
            </>
          } />
          {/* Auth Routes */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } />
          <Route path="/verify-email" element={
            <ProtectedRoute requireAuth={false}>
              <VerifyEmail />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPassword />
            </ProtectedRoute>
          } />
          <Route path="/reset-password" element={
            <ProtectedRoute requireAuth={false}>
              <ResetPassword />
            </ProtectedRoute>
          } />
          <Route path="/verify-reset-otp" element={
            <ProtectedRoute requireAuth={false}>
              <VerifyResetOtp />
            </ProtectedRoute>
          } />
          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          {/* Thank You Page after payment */}
          <Route path="/account" element={<ThankYou />} />
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;