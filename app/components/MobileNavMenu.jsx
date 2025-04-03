"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MobileNavMenu({ navLinks, isOpen, onClose }) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute top-0 right-0 h-full w-[300px] bg-white bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] shadow-lg transform transition-transform duration-300 ease-in-out">
        {/* Header with logo and close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <Link href="/" className="flex flex-row gap-2 cursor-pointer" onClick={onClose}> 
            <Image className="h-12 w-12" src="/logo.svg" alt="Maddisun Logo" width={40} height={40} />
            <div className="leading-none tracking-normal text-[#32B18A] space-y-0">
              <h4 className="font-bold text-xl">Maddisun</h4>
              <h5 className="font-semibold text-sm mt-[-2px]">Ventures LLP</h5>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100"
          >
            <Image className="h-6 w-6" src="/close.svg" alt="Close menu" width={24} height={24} />
          </button>
        </div>
        
        {/* Navigation links */}
        <nav className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.url}
              className="py-4 px-5 border-b border-gray-100 text-lg text-[#5F6980] hover:text-[#F69220] active:text-[#F69220]"
              onClick={onClose}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        
        {/* Contact us button */}
        <div className="px-5 py-8">
          <Link 
            href="/products?active-step=3" 
            className="flex justify-center items-center gap-2 bg-[#FFA943] text-white py-3 px-4 rounded-full hover:underline text-lg w-full"
            onClick={onClose}
          >
            <p>Contact Us</p>
            <Image className="h-5 w-5" src="/arrow-up-right.svg" alt="Contact Us" width={20} height={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}