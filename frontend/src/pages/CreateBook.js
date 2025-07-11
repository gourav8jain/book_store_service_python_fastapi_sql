import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthors, useCategories, useCreateBook } from '../hooks/useApi';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBook = () => {
  const navigate = useNavigate();
  const createBookMutation = useCreateBook();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    isbn: '',
    publication_year: '',
    pages: '',
    author_id: '',
    category_id: ''
  });

  const { data: authorsData } = useAuthors({ limit: 100 });
  const { data: categoriesData } = useCategories({ limit: 100 });

  const authors = authorsData?.items || [];
  const categories = categoriesData?.items || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createBookMutation.mutateAsync(formData);
      navigate('/books');
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Create book error:', error);
    }
  };

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
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Book</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter book title"
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <select
                  id="author_id"
                  name="author_id"
                  value={formData.author_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              {/* ISBN */}
              <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ISBN"
                />
              </div>

              {/* Publication Year */}
              <div>
                <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Year
                </label>
                <input
                  type="number"
                  id="publication_year"
                  name="publication_year"
                  value={formData.publication_year}
                  onChange={handleChange}
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2024"
                />
              </div>

              {/* Pages */}
              <div>
                <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
                  Pages
                </label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of pages"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter book description"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <Link
                to="/books"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={createBookMutation.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createBookMutation.isLoading ? 'Creating...' : 'Create Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook; 