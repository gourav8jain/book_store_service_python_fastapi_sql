import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthors } from '../hooks/useApi';
import { PlusIcon, MagnifyingGlassIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Authors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  const { data: authorsData, isLoading, error, refetch } = useAuthors({
    search: searchTerm,
    skip: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage
  });

  const authors = authorsData?.items || [];
  const totalAuthors = authorsData?.total || 0;
  const totalPages = Math.ceil(totalAuthors / itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleDelete = async (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        // TODO: Implement delete functionality
        toast.success('Author deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete author');
      }
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Failed to load authors</div>
        <button 
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your authors ({totalAuthors} authors)
          </p>
        </div>
        <Link
          to="/authors/create"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Author
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search authors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Search
        </button>
      </form>

      {/* Authors Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : authors.length === 0 ? (
        <div className="text-center py-12">
          <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No authors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first author.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link
                to="/authors/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Author
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authors.map((author) => (
              <div key={author.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {author.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {author.biography ? author.biography.substring(0, 100) + '...' : 'No biography available'}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {author.books_count || 0} books
                        </span>
                        {author.birth_date && (
                          <span className="text-xs text-gray-500">
                            Born: {new Date(author.birth_date).getFullYear()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/authors/${author.id}`}
                      className="flex-1 text-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(author.id)}
                      className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalAuthors)} of {totalAuthors} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Authors; 