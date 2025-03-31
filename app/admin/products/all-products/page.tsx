'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

// Types
interface Product {
  _id: string;
  name: string;
  cas_no: string;
  end_use: string;
  type: string;
}

interface EditableProduct extends Product {
  isEditing: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/products');

      if (response.status != 200) {
        throw new Error('Failed to fetch products');
      }

      const data = response.data;
      setProducts(data.map((product: Product) => ({ ...product, isEditing: false })));
    } catch (error: any) {
      alert(error.response.data.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.delete(`/api/products`, {
        data: { id },
      });

      if (response.status != 200) {
        throw new Error('Failed to delete product');
      }

      fetchProducts();
    } catch (error: any) {
      alert(error.response.data.error || 'Failed to delete product');
      fetchProducts();
    }
  };

  // Toggle edit mode for a product
  const toggleEditMode = (id: string) => {
    setProducts(products.map(product =>
      product._id === id ? { ...product, isEditing: !product.isEditing } : product
    ));
  };

  // Update a product
  const updateProduct = async (updatedProduct: Partial<Product>) => {
    try {
      const response = await axios.put(`/api/products`, updatedProduct);

      if (response.status != 200) {
        throw new Error('Failed to update product');
      }

      fetchProducts();
    } catch (error: any) {
      alert(error.response.data.error || 'Failed to update the product');
      fetchProducts();
    }
  };

  // Handle form field changes
  const handleChange = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map(product =>
      product._id === id ? { ...product, [field]: value } : product
    ));
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Product Management</h1>

      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAS Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">End Use</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <motion.tr
                key={product._id}
                variants={itemVariants}
              >
                {product.isEditing ? (
                  // Edit mode
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleChange(product._id, 'name', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={product.cas_no}
                        onChange={(e) => handleChange(product._id, 'cas_no', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <input
                        type="text"
                        value={product.end_use}
                        onChange={(e) => handleChange(product._id, 'end_use', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={product.type}
                        onChange={(e) => handleChange(product._id, 'type', e.target.value)}
                        className="w-full p-1 border rounded"
                      >
                         <option value="Intermediates">Intermediates</option>
                         <option value="API">API</option>
                         <option value="Unknown">Unknown</option>

                      </select>
                    </td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        onClick={() => updateProduct({
                          _id: product._id,
                          name: product.name,
                          cas_no: product.cas_no,
                          end_use: product.end_use,
                          type: product.type
                        })}
                        className="text-sm bg-green-500 text-white p-1 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEditMode(product._id)}
                        className="text-sm bg-gray-300 text-gray-700 p-1 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // View mode
                  <>
                    <td className="px-4 py-3 text-sm">{product.name}</td>
                    <td className="px-4 py-3 text-sm">{product.cas_no}</td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">{product.end_use}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {product.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleEditMode(product._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteProduct(product._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </>
                )}
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Mobile view - expands details for each product on small screens */}
      <div className="md:hidden mt-6 space-y-4">
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            className="p-4 rounded-lg shadow bg-white"
          >
            {product.isEditing ? (
              // Mobile edit mode
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleChange(product._id, 'name', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">CAS Number</label>
                  <input
                    type="text"
                    value={product.cas_no}
                    onChange={(e) => handleChange(product._id, 'cas_no', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">End Use</label>
                  <input
                    type="text"
                    value={product.end_use}
                    onChange={(e) => handleChange(product._id, 'end_use', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                  <input
                    type="text"
                    value={product.type}
                    onChange={(e) => handleChange(product._id, 'type', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => updateProduct({
                      _id: product._id,
                      name: product.name,
                      cas_no: product.cas_no,
                      end_use: product.end_use,
                      type: product.type
                    })}
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => toggleEditMode(product._id)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Mobile view mode
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">CAS Number:</span> {product.cas_no}
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {product.type}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">End Use:</span>
                  <p className="mt-1">{product.end_use}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleEditMode(product._id)}
                      className="bg-blue-500 text-white p-2 rounded-full"
                    >
                      <FaEdit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white p-2 rounded-full"
                    >
                      <FaTrash size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}