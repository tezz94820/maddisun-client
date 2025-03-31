'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

// Types
interface Blog {
  _id: string;
  title: string;
  category: string;
  link: string;
  pinned: boolean;
  date: string;
}

interface EditableBlog extends Blog {
  isEditing: boolean;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<EditableBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/blogs');

      if (response.status != 200) {
        throw new Error('Failed to fetch blogs');
      }

      const data = response.data;
      setBlogs(data.map((blog: Blog) => ({ ...blog, isEditing: false })));
    } catch (error: any) {
      alert(error.response.data.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await axios.delete(`/api/blogs`, {
        data: { id },
      });

      if (response.status != 200) {
        throw new Error('Failed to delete blog');
      }

      fetchBlogs();
    } catch (error: any) {
      alert(error.response.data.error || 'Failed to delete blog');
      fetchBlogs();
    }
  };

  // Toggle edit mode for a blog
  const toggleEditMode = (id: string) => {
    setBlogs(blogs.map(blog =>
      blog._id === id ? { ...blog, isEditing: !blog.isEditing } : blog
    ));
  };

  // Update a blog
  const updateBlog = async (updatedBlog: Partial<Blog>) => {
    try {
      const response = await axios.put(`/api/blogs`, updatedBlog);

      if (response.status != 200) {
        throw new Error('Failed to update blog');
      }

      fetchBlogs();
    } catch (error: any) {
      alert(error.response.data.error || 'Failed to update the blog');
      fetchBlogs();
    }
  };

  // Handle form field changes
  const handleChange = (id: string, field: keyof Blog, value: string | boolean) => {
    setBlogs(blogs.map(blog =>
      blog._id === id ? { ...blog, [field]: value } : blog
    ));
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchBlogs();
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
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Blog Management</h1>

      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Link</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pinned</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <motion.tr
                key={blog._id}
                variants={itemVariants}
                className={blog.pinned ? "bg-yellow-50" : ""}
              >
                {blog.isEditing ? (
                  // Edit mode
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => handleChange(blog._id, 'title', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={blog.category}
                        onChange={(e) => handleChange(blog._id, 'category', e.target.value)}
                        className="w-full p-1 border rounded"
                      >
                        <option value="Top Stories">Top Stories</option>
                        <option value="Pharma">Pharma</option>
                        <option value="Hospitals">Hospitals</option>
                        <option value="Industry">Industry</option>
                        <option value="Policy">Policy</option>
                        <option value="Education">Education</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <input
                        type="text"
                        value={blog.link}
                        onChange={(e) => handleChange(blog._id, 'link', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={blog.pinned}
                        onChange={(e) => handleChange(blog._id, 'pinned', e.target.checked)}
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <input
                        type="date"
                        value={blog.date.slice(0, 10)}
                        onChange={(e) => handleChange(blog._id, 'date', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button
                        onClick={() => updateBlog({
                          _id: blog._id,
                          title: blog.title,
                          category: blog.category,
                          link: blog.link,
                          pinned: blog.pinned,
                          date: blog.date
                        })}
                        className="text-sm bg-green-500 text-white p-1 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEditMode(blog._id)}
                        className="text-sm bg-gray-300 text-gray-700 p-1 rounded hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // View mode
                  <>
                    <td className="px-4 py-3 text-sm">{blog.title}</td>
                    <td className="px-4 py-3 text-sm">{blog.category}</td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">
                      <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate block max-w-xs">
                        {blog.link}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {blog.pinned ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pinned
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          Not Pinned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">
                      {new Date(blog.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleEditMode(blog._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteBlog(blog._id)}
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

      {/* Mobile view - expands details for each blog on small screens */}
      <div className="md:hidden mt-6 space-y-4">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            variants={itemVariants}
            className={`p-4 rounded-lg shadow ${blog.pinned ? "bg-yellow-50 border-l-4 border-yellow-400" : "bg-white"}`}
          >
            {blog.isEditing ? (
              // Mobile edit mode
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={blog.title}
                    onChange={(e) => handleChange(blog._id, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                  <input
                    type="text"
                    value={blog.category}
                    onChange={(e) => handleChange(blog._id, 'category', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Link</label>
                  <input
                    type="text"
                    value={blog.link}
                    onChange={(e) => handleChange(blog._id, 'link', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                  <input
                    type="date"
                    value={blog.date.slice(0, 10)}
                    onChange={(e) => handleChange(blog._id, 'date', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={blog.pinned}
                    onChange={(e) => handleChange(blog._id, 'pinned', e.target.checked)}
                    className="h-4 w-4 mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">Pinned</label>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => updateBlog({
                      _id: blog._id,
                      title: blog.title,
                      category: blog.category,
                      link: blog.link,
                      pinned: blog.pinned,
                      date: blog.date
                    })}
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => toggleEditMode(blog._id)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Mobile view mode
              <div>
                <h3 className="font-bold text-lg">{blog.title}</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span> {blog.category}
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span> {new Date(blog.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Link:</span>
                  <a href={blog.link} className="text-blue-500 hover:underline block mt-1 truncate">
                    {blog.link}
                  </a>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleEditMode(blog._id)}
                      className="bg-blue-500 text-white p-2 rounded-full"
                    >
                      <FaEdit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteBlog(blog._id)}
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