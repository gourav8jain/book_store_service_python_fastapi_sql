import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useHealthCheck } from './hooks/useApi';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Authors from './pages/Authors';
import Categories from './pages/Categories';
import BookDetail from './pages/BookDetail';
import AuthorDetail from './pages/AuthorDetail';
import CategoryDetail from './pages/CategoryDetail';
import CreateBook from './pages/CreateBook';
import CreateAuthor from './pages/CreateAuthor';
import CreateCategory from './pages/CreateCategory';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: healthData, isLoading: healthLoading } = useHealthCheck();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content area */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Health status indicator */}
            {healthLoading ? (
              <div className="mb-4 flex items-center">
                <div className="loading-spinner mr-2"></div>
                <span className="text-sm text-gray-500">Checking API status...</span>
              </div>
            ) : healthData?.status === 'healthy' ? (
              <div className="mb-4 flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-green-600">API is healthy</span>
              </div>
            ) : (
              <div className="mb-4 flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-red-600">API connection issue</span>
              </div>
            )}

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/create" element={<CreateBook />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/authors/create" element={<CreateAuthor />} />
              <Route path="/authors/:id" element={<AuthorDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App; 