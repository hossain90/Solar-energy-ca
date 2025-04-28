import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseTracker from './components/MouseTracker';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load all pages
const Home = React.lazy(() => import('./pages/Home'));
const Calculator = React.lazy(() => import('./pages/Calculator'));
const Comparison = React.lazy(() => import('./pages/Comparison'));
const Products = React.lazy(() => import('./pages/Products'));
const About = React.lazy(() => import('./pages/About'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Blog = React.lazy(() => import('./pages/Blog'));
const GuideToSolar = React.lazy(() => import('./pages/GuideToSolar'));
const InstallationTips = React.lazy(() => import('./pages/InstallationTips'));
const FAQ = React.lazy(() => import('./pages/FAQ'));

// Loading fallback component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48"></div>
      <div className="h-4 bg-gray-200 rounded w-64"></div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-white">
        <ErrorBoundary>
          <MouseTracker />
          <Navbar />
          <main>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                } />
                <Route path="/calculator" element={
                  <ErrorBoundary>
                    <Calculator />
                  </ErrorBoundary>
                } />
                <Route path="/comparison" element={
                  <ErrorBoundary>
                    <Comparison />
                  </ErrorBoundary>
                } />
                <Route path="/products" element={
                  <ErrorBoundary>
                    <Products />
                  </ErrorBoundary>
                } />
                <Route path="/about" element={
                  <ErrorBoundary>
                    <About />
                  </ErrorBoundary>
                } />
                <Route path="/dashboard" element={
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                } />
                <Route path="/pricing" element={
                  <ErrorBoundary>
                    <Pricing />
                  </ErrorBoundary>
                } />
                <Route path="/blog" element={
                  <ErrorBoundary>
                    <Blog />
                  </ErrorBoundary>
                } />
                <Route path="/guide-to-solar" element={
                  <ErrorBoundary>
                    <GuideToSolar />
                  </ErrorBoundary>
                } />
                <Route path="/installation-tips" element={
                  <ErrorBoundary>
                    <InstallationTips />
                  </ErrorBoundary>
                } />
                <Route path="/faq" element={
                  <ErrorBoundary>
                    <FAQ />
                  </ErrorBoundary>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;