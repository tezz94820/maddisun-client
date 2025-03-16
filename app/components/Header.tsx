"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
    {
        title: "Home",
        url: "#"
    },
    {
        title: "About us",
        url: "#"
    },
    {
        title: "Products",
        url: "#"
    },
    {
        title: "Testimonials",
        url: "#"
    },
    {
        title: "Blogs",
        url: "#"
    }
]

export default function Header() {
    return (
        <nav className="flex flex-row justify-between items-center py-2 px-4 lg:px-10 shadow-md shadow-[#32B18A] sticky top-0 bg-white z-50">
            <Link  href="/" className="flex flex-row gap-2"> 
                <Image className="h-12 w-12 lg:h-15 lg:w-15" src="/logo.svg" alt="Maddisun Logo" width={50} height={50} />
                <div className="leading-none tracking-normal text-[#32B18A] space-y-0" >
                    <h4 className="font-bold text-lg lg:text-2xl">Maddisun</h4>
                    <h5 className="font-semibold text-xs lg:text-base mt-[-2px]">Ventures LLP</h5>
                </div>
            </Link>
            <div className="hidden sm:flex flex-row justify-between sm:gap-4 lg:gap-6 text-[#5F6980] sm:text-lg lg:text-xl font-normal ">
                {
                    navLinks.map((link, index) => (
                        <button key={index} className="min-w-max whitespace-nowrap hover:text-[#F69220] active:text-[#F69220]">{link.title}</button>
                    ))
                }
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
                <button className=" h-min flex flex-row gap-1 cursor-pointer bg-[#FFA943] text-white py-1 px-2 lg:py-2 lg:px-4 rounded-full hover:underline">
                    <p className="text-base lg:text-xl">Contact Us</p>
                    <Image className="h-6 w-6" src="/arrow-up-right.svg" alt="Contact Us" width={30} height={30} />
                </button>
                <button className="sm:hidden h-fit w-fit">
                    <Image className="h-8 w-8" src="/menu.svg" alt="menu" width={30} height={30} />
                </button>
            </div>
        </nav>
    )
}