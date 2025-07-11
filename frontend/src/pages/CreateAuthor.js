import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateAuthor } from '../hooks/useApi';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateAuthor = () => {
  const navigate = useNavigate();
  const createAuthorMutation = useCreateAuthor();
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    birth_date: '',
    death_date: '',
    nationality: ''
  });

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
      await createAuthorMutation.mutateAsync(formData);
      navigate('/authors');
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Create author error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/authors"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Authors
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Author</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              {/* Nationality */}
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter nationality"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Death Date */}
              <div>
                <label htmlFor="death_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Death Date
                </label>
                <input
                  type="date"
                  id="death_date"
                  name="death_date"
                  value={formData.death_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Biography */}
            <div>
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
                Biography
              </label>
              <textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter author biography"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <Link
                to="/authors"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={createAuthorMutation.isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createAuthorMutation.isLoading ? 'Creating...' : 'Create Author'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAuthor; 