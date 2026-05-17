import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import AlbumPage from './pages/AlbumPage';
import BookingPage from './pages/BookingPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, profile, loading, isAdmin } = useAuth();
  
  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/booking" element={<BookingPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
        <Toaster position="bottom-right" theme="dark" />
      </Router>
    </AuthProvider>
  );
}

export default App;
