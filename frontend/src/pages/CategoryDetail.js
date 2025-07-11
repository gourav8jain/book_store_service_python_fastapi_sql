import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCategory, useDeleteCategory } from '../hooks/useApi';
import { ArrowLeftIcon, PencilIcon, TrashIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: category, isLoading, error, refetch } = useCategory(id);
  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategoryMutation.mutateAsync(id);
        navigate('/categories');
      } catch (error) {
        // Error handled by mutation hook
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Failed to load category details</div>
        <button 
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Category not found</div>
        <Link
          to="/categories"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/categories"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Categories
          </Link>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/categories/${id}/edit`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-md hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>

      {/* Category Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
              
              {category.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{category.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Books Count</h3>
                  <p className="mt-1 text-sm text-gray-900">{category.books_count || 0} books</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Created</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {category.created_at ? new Date(category.created_at).toLocaleDateString() : 'Not available'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Created</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {category.created_at ? new Date(category.created_at).toLocaleDateString() : 'Not available'}
                    </p>
                  </div>

                  {category.updated_at && category.updated_at !== category.created_at && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Updated</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(category.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category's Books */}
      {category.books && category.books.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Books in {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.books.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-colors"
                >
                  <h3 className="font-medium text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {book.author?.name || 'Unknown Author'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">${book.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      book.stock > 10 ? 'bg-green-100 text-green-800' :
                      book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail; 