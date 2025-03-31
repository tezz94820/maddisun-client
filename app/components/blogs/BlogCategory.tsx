"use client";

import React, { useEffect, useState } from 'react';
import BlogCategoryCard from './BlogCategoryCard';
import axios from 'axios';
import { motion } from 'framer-motion';

type CategoryBlogType = {
    _id: string;
    title: string;
    category: string;
    date: string;
}

const BlogCategory = () => {
    const [categories, setCategories] = useState<CategoryBlogType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/blogs?pinnedonly=true');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    console.log(categories);

    return (
        <div className="h-fit w-full px-10 py-5 md:px-8 lg:px-4 md:py-10 flex gap-[3rem] flex-row flex-wrap justify-evenly">
            {loading ? (
                <div className="flex items-center justify-center w-full py-12">
                    <div className="flex flex-col items-center">
                        <motion.div 
                            className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-gray-600 font-medium"
                        >
                            Loading categories...
                        </motion.p>
                    </div>
                </div>
            ) : (
                categories.map((category) => (
                    <BlogCategoryCard 
                        key={category._id} 
                        _id={category._id} 
                        category_name={category.category} 
                        date={category.date} 
                        story={category.title} 
                    />
                ))
            )}
        </div>
    );
}

export default BlogCategory;