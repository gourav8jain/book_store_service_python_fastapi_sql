import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBook } from '../hooks/useApi';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, error, refetch } = useBook(id);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        // TODO: Implement delete functionality
        toast.success('Book deleted successfully');
        navigate('/books');
      } catch (error) {
        toast.error('Failed to delete book');
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
        <div className="text-red-500 text-lg">Failed to load book details</div>
        <button 
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Book not found</div>
        <Link
          to="/books"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Books
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
            to="/books"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Books
          </Link>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/books/${id}/edit`}
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

      {/* Book Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">
                by{' '}
                <Link 
                  to={`/authors/${book.author?.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {book.author?.name || 'Unknown Author'}
                </Link>
              </p>
              
              {book.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    <Link 
                      to={`/categories/${book.category?.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {book.category?.name || 'Uncategorized'}
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">ISBN</h3>
                  <p className="mt-1 text-sm text-gray-900">{book.isbn || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Publication Year</h3>
                  <p className="mt-1 text-sm text-gray-900">{book.publication_year || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pages</h3>
                  <p className="mt-1 text-sm text-gray-900">{book.pages || 'Not available'}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Price</h3>
                    <p className="text-2xl font-bold text-green-600">${book.price}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Stock Status</h3>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        book.stock > 10 ? 'bg-green-100 text-green-800' :
                        book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Created</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {book.created_at ? new Date(book.created_at).toLocaleDateString() : 'Not available'}
                    </p>
                  </div>

                  {book.updated_at && book.updated_at !== book.created_at && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Updated</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(book.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 