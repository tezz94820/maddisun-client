'use client';

import { useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our data
interface Product {
  _id: string;
  // Add other product fields if needed
}

interface Enquiry {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

// Props for the MessageModal component
interface MessageModalProps {
  message: string | undefined;
  onClose: () => void;
}

type FilterType = 'all' | 'today' | 'yesterday' | 'custom';

export default function EnquiriesPage(): JSX.Element {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [customDate, setCustomDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Function to fetch enquiries with optional filter
  const fetchEnquiries = async (filter?: string, date?: string): Promise<void> => {
    setLoading(true);
    try {
      // Build URL with query parameters
      let url = '/api/enquiry';
      const params = new URLSearchParams();
      
      if (filter && filter !== 'all') {
        params.append('filter', filter);
      }
      
      if (date) {
        params.append('date', date);
      }
      
      // Add query parameters to URL if any exist
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }
      
      const data: Enquiry[] = await response.json();
      setEnquiries(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      fetchEnquiries();
    } else if (filter === 'today' || filter === 'yesterday') {
      fetchEnquiries(filter);
    } else if (filter === 'custom') {
      setShowDatePicker(true);
    }
  };

  // Handle custom date selection
  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(e.target.value);
  };

  // Apply custom date filter
  const applyCustomDateFilter = () => {
    if (customDate) {
      fetchEnquiries(undefined, customDate);
      setShowDatePicker(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  // Truncate message for table display
  const truncateMessage = (message?: string): string => {
    if (!message) return 'No message';
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  // Get today's date in YYYY-MM-DD format for datepicker max
  const getTodayString = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Modal component for displaying full message
  const MessageModal = ({ message, onClose }: MessageModalProps): JSX.Element => {
    return (
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Message Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              type="button"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
            {message || 'No message provided'}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1 
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Enquiries Dashboard
      </motion.h1>

      {/* Filter controls */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-gray-700">Filter by:</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-md ${activeFilter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            All Enquiries
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterChange('today')}
            className={`px-4 py-2 rounded-md ${activeFilter === 'today' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterChange('yesterday')}
            className={`px-4 py-2 rounded-md ${activeFilter === 'yesterday' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Yesterday
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterChange('custom')}
            className={`px-4 py-2 rounded-md ${activeFilter === 'custom' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Custom Date
          </motion.button>
        </div>

        {/* Custom date picker */}
        <AnimatePresence>
          {showDatePicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="date"
                  value={customDate}
                  onChange={handleCustomDateChange}
                  max={getTodayString()}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyCustomDateFilter}
                  disabled={!customDate}
                  className={`px-4 py-2 rounded-md ${!customDate 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  Apply Filter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDatePicker(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results indicator with count */}
      <div className="mb-6 text-gray-600">
        <p>
          {activeFilter === 'all' && 'Showing all enquiries'}
          {activeFilter === 'today' && 'Showing today\'s enquiries'}
          {activeFilter === 'yesterday' && 'Showing yesterday\'s enquiries'}
          {activeFilter === 'custom' && customDate && `Showing enquiries for ${new Date(customDate).toLocaleDateString()}`}
          {' '}<span className="font-medium">({enquiries.length} result{enquiries.length !== 1 ? 's' : ''})</span>
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enquiry, index) => (
                <motion.tr 
                  key={enquiry._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {enquiry.first_name} {enquiry.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <a href={`mailto:${enquiry.email}`} className="text-blue-600 hover:underline">
                        {enquiry.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <a href={`tel:${enquiry.phone}`} className="text-blue-600 hover:underline">
                        {enquiry.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedMessage(enquiry.message || null)}
                      className="text-sm text-gray-900 hover:text-blue-600 focus:outline-none"
                      type="button"
                    >
                      {truncateMessage(enquiry.message)}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {enquiry.products?.length || 0} products
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(enquiry.createdAt)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {enquiries.length === 0 && (
        <motion.div 
          className="mt-6 text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No enquiries found for the selected filter
        </motion.div>
      )}

      <AnimatePresence>
        {selectedMessage !== null && (
          <MessageModal 
            message={selectedMessage} 
            onClose={() => setSelectedMessage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}