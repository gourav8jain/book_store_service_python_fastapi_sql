import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  TagIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Books', href: '/books', icon: BookOpenIcon },
  { name: 'Authors', href: '/authors', icon: UserGroupIcon },
  { name: 'Categories', href: '/categories', icon: TagIcon },
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Book Store</span>
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500">
              Book Store v1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white shadow-lg border-r border-gray-200">
          {/* Sidebar header */}
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Book Store</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500">
              Book Store v1.0.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 