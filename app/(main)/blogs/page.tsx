"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
// import SelectProductsTab from "@/app/components/ProductsPage/SelectProductsTab";
import ExceptionalQualityContactUsSection from "@/app/components/homepage/ExceptionalQualityContactUsSection";
import section2List from '@/app/data/homepageSection2.json';
import FinaliseListTab from "@/app/components/ProductsPage/FinaliseListTab";
import SelectProductsTab from "@/app/components/ProductsPage/SelectProductsTab";
import SendEnquiryTab from "@/app/components/ProductsPage/SendEnquiryTab";
import BlogCategoryCard from "@/app/components/BlogCategoryCard";

const categories = [
    {
        id: "1",
        image: "/blogs/image-1.jpg",
        category_name: "TOP STORIES",
        date: "AUGUST 13, 2024",
        story: "Jubliant pharmova posts multi fold rise in Q1 net profit to Rs 481.6 cr"
    },
    {
        id: "2",
        image: "/blogs/image-1.jpg",
        category_name: "HOSPITALS",
        date: "AUGUST 13, 2024",
        story: "Jubliant pharmova posts multi fold rise in Q1 net profit to Rs 481.6 cr"
    },
    {
        id: "3",
        image: "/blogs/image-1.jpg",
        category_name: "PHARMA",
        date: "AUGUST 13, 2024",
        story: "Jubliant pharmova posts multi fold rise in Q1 net profit to Rs 481.6 cr"
    },
    {
        id: "4",
        image: "/blogs/image-1.jpg",
        category_name: "POLICY",
        date: "AUGUST 13, 2024",
        story: "Jubliant pharmova posts multi fold rise in Q1 net profit to Rs 481.6 cr"
    },
    {
        id: "5",
        image: "/blogs/image-1.jpg",
        category_name: "INDUSTRY",
        date: "AUGUST 13, 2024",
        story: "Jubliant pharmova posts multi fold rise in Q1 net profit to Rs 481.6 cr"
    },
    {
        id: "6",
        image: "/blogs/image-1.jpg",
        category_name: "EDUCATION",
        date: "AUGUST 13, 2024",
        story: "Jubliant pharmova posts multi fold rise in Q1 net profit to Rs 481.6 cr"
    }
]

export default function Blogs() {

    return (
        <div className="relative flex flex-col items-center w-full overflow-hidden">

            {/* heading section */}
            <section className="relative bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] h-fit w-full px-5 py-6 md:px-8 lg:px-10 md:py-10">
                
                <Image src="/homepage/section-upper-design.svg" className="absolute top-0 left-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto -z-10" alt="section-design" height={500} width={500} />
                
                <div className="z-10 flex flex-col gap-5 md:gap-10">
                    <p className="text-2xl md:text-5xl font-bold  lg:w-3/4">Top and noteworthy stories from the pharmaceutical industry</p>
                    <p className="text-2xl font-semibold text-[#5F6980]">In the spotlight</p>
                </div>
                
                {/* categories section */}
                <div className="h-fit w-full px-10 py-5 md:px-8 lg:px-4 md:py-10 flex gap-[3rem] flex-row flex-wrap justify-evenly">
                    {
                        categories.map((category) => (
                            <BlogCategoryCard key={category.id} id={category.id} image={category.image} category_name={category.category_name} date={category.date} story={category.story} />
                        ))
                    }
                </div>
            
            </section>



            {/* section-3 */}
            <ExceptionalQualityContactUsSection />
        </div>
    )
}