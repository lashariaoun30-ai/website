import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './components/Home';
import BookingPage from './components/Booking';
import BlogPage from './components/Blog';
import PrivacyPolicy from './components/PrivacyPolicy';
import CalcolatorePage from './components/Calcolatore';
import BlogPostPage from './components/BlogPost';
import Layout from './components/Layout';

// Placeholder component for Soluzioni
const SoluzioniPage = () => (
  <div className="min-h-screen">
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-medium text-center mb-6">Soluzioni</h1>
      <p className="text-center text-muted-foreground">Le nostre soluzioni di automazione AI.</p>
    </div>
  </div>
);

// Layout wrapper for consistent page structure
const AppLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/soluzioni" element={<SoluzioniPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/calcolatore" element={<CalcolatorePage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
