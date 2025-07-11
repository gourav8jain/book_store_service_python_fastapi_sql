import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../api/client';
import toast from 'react-hot-toast';

// Books hooks
export const useBooks = (params = {}) => {
  return useQuery(
    ['books', params],
    async () => {
      const response = await api.getBooks(params);
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useBook = (id) => {
  return useQuery(
    ['book', id],
    async () => {
      const response = await api.getBook(id);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (data) => {
      const response = await api.createBook(data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['books']);
        toast.success('Book created successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to create book');
      },
    }
  );
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const response = await api.updateBook(id, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['books']);
        queryClient.invalidateQueries(['book', variables.id]);
        toast.success('Book updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to update book');
      },
    }
  );
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id) => {
      const response = await api.deleteBook(id);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['books']);
        toast.success('Book deleted successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to delete book');
      },
    }
  );
};

export const useUpdateBookStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, quantityChange }) => {
      const response = await api.updateBookStock(id, quantityChange);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['books']);
        queryClient.invalidateQueries(['book', variables.id]);
        toast.success('Stock updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to update stock');
      },
    }
  );
};

// Authors hooks
export const useAuthors = (params = {}) => {
  return useQuery(
    ['authors', params],
    async () => {
      const response = await api.getAuthors(params);
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useAuthor = (id) => {
  return useQuery(
    ['author', id],
    async () => {
      const response = await api.getAuthor(id);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (data) => {
      const response = await api.createAuthor(data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['authors']);
        toast.success('Author created successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to create author');
      },
    }
  );
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const response = await api.updateAuthor(id, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['authors']);
        queryClient.invalidateQueries(['author', variables.id]);
        toast.success('Author updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to update author');
      },
    }
  );
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id) => {
      const response = await api.deleteAuthor(id);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['authors']);
        queryClient.invalidateQueries(['books']);
        toast.success('Author deleted successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to delete author');
      },
    }
  );
};

// Categories hooks
export const useCategories = (params = {}) => {
  return useQuery(
    ['categories', params],
    async () => {
      const response = await api.getCategories(params);
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useCategory = (id) => {
  return useQuery(
    ['category', id],
    async () => {
      const response = await api.getCategory(id);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (data) => {
      const response = await api.createCategory(data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        toast.success('Category created successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to create category');
      },
    }
  );
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const response = await api.updateCategory(id, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['categories']);
        queryClient.invalidateQueries(['category', variables.id]);
        toast.success('Category updated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to update category');
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id) => {
      const response = await api.deleteCategory(id);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        queryClient.invalidateQueries(['books']);
        toast.success('Category deleted successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.detail || 'Failed to delete category');
      },
    }
  );
};

// Search hook
export const useSearchBooks = (query) => {
  return useQuery(
    ['search', query],
    async () => {
      const response = await api.searchBooks(query);
      return response.data;
    },
    {
      enabled: !!query,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Health check hook
export const useHealthCheck = () => {
  return useQuery(
    ['health'],
    async () => {
      const response = await api.healthCheck();
      return response.data;
    },
    {
      refetchInterval: 30000, // Check every 30 seconds
      staleTime: 10 * 1000, // 10 seconds
    }
  );
}; 