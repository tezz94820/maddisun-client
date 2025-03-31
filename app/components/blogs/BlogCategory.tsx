"use client";

import React, { useEffect, useState } from 'react'
import BlogCategoryCard from './BlogCategoryCard'
import axios from 'axios';

type CategoryBlogType = {
    _id: string;
    title: string;
    category: string;
    date: string;
}

const BlogCategory = () => {

    const [categories, setCategories] = useState<CategoryBlogType[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/blogs?pinnedonly=true');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories()
    }, [])

    console.log(categories);

    return (
        <div className="h-fit w-full px-10 py-5 md:px-8 lg:px-4 md:py-10 flex gap-[3rem] flex-row flex-wrap justify-evenly">
            {
                categories.map((category) => (
                    <BlogCategoryCard key={category._id} _id={category._id} category_name={category.category} date={category.date} story={category.title} />
                ))
            }
        </div>
    )
}

export default BlogCategory