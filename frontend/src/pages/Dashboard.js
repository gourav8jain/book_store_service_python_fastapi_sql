import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks, useAuthors, useCategories } from '../hooks/useApi';
import {
  BookOpenIcon,
  UserGroupIcon,
  TagIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { data: booksData, isLoading: booksLoading } = useBooks({ size: 5 });
  const { data: authors, isLoading: authorsLoading } = useAuthors({ limit: 5 });
  const { data: categories, isLoading: categoriesLoading } = useCategories({ limit: 5 });

  const stats = [
    {
      name: 'Total Books',
      value: booksData?.total || 0,
      icon: BookOpenIcon,
      color: 'bg-blue-500',
      href: '/books',
    },
    {
      name: 'Total Authors',
      value: authors?.length || 0,
      icon: UserGroupIcon,
      color: 'bg-green-500',
      href: '/authors',
    },
    {
      name: 'Total Categories',
      value: categories?.length || 0,
      icon: TagIcon,
      color: 'bg-purple-500',
      href: '/categories',
    },
  ];

  const quickActions = [
    {
      name: 'Add New Book',
      description: 'Create a new book entry',
      href: '/books/create',
      icon: PlusIcon,
    },
    {
      name: 'Add New Author',
      description: 'Add a new author to the system',
      href: '/authors/create',
      icon: PlusIcon,
    },
    {
      name: 'Add New Category',
      description: 'Create a new book category',
      href: '/categories/create',
      icon: PlusIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Book Store management system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="card hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="card hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gray-100 rounded-md p-3 group-hover:bg-primary-100 transition-colors duration-200">
                  <action.icon className="h-6 w-6 text-gray-600 group-hover:text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Books */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Books</h2>
          <Link to="/books" className="text-sm text-primary-600 hover:text-primary-500">
            View all
          </Link>
        </div>
        <div className="card">
          {booksLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="loading-spinner"></div>
              <span className="ml-2 text-gray-500">Loading books...</span>
            </div>
          ) : booksData?.items?.length > 0 ? (
            <div className="space-y-4">
              {booksData.items.map((book) => (
                <div key={book.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-500">by {book.author?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${book.price}</p>
                    <p className="text-xs text-gray-500">{book.stock_quantity} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No books found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 