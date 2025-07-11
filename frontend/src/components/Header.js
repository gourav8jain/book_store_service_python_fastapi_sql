import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
              Book Store
            </span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search books..."
              />
            </div>
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <Link
            to="/books/create"
            className="btn-primary text-sm"
          >
            Add Book
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 