"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type BlogSectionProps = {
  category: string;
}

type BlogType = {
  _id: string;
  title: string;
  date: string;
  link: string;
}

const BlogSection = ({ category }: BlogSectionProps) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/blogs?category=${category}`);
        setBlogs(response.data);
        console.log(blogs);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, [category]);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "#f9fffd",
      transition: { duration: 0.3 }
    }
  };

  // Badge animation
  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 200
      }
    }
  };

  // Title animation
  const titleVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.1,
        duration: 0.5
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-t-4 border-t-emerald-500 border-emerald-100 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {blogs.map(blog => (
        <motion.div
          key={blog._id}
          variants={itemVariants}
          whileHover="hover"
          className="overflow-hidden"
        >
          <Link 
            target="_blank" 
            href={blog.link} 
            className="flex flex-col gap-4 pr-8 py-5 border-b-2 border-[#DCF5EC] cursor-pointer"
          >
            <motion.p 
              variants={badgeVariants}
              className="font-semibold text-base text-gray-500 px-2 py-1 bg-white shadow-lg shadow-[#DCF5EC] w-fit"
            >
              {blog.date}
            </motion.p>
            <motion.h2 
              variants={titleVariants}
              className="font-bold text-2xl md:text-3xl text-gray-700 w-full lg:w-[80%]"
            >
              {blog.title}
            </motion.h2>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogSection;