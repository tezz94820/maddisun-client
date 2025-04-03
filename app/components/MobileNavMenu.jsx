"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div 
            className="fixed top-0 right-0 h-full w-[300px] bg-white bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] shadow-lg z-50"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            {/* Header with logo and close button */}
            <motion.div 
              className="flex justify-between items-center p-4 border-b border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/" className="flex flex-row gap-2 cursor-pointer" onClick={onClose}> 
                <motion.div 
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Image className="h-12 w-12" src="/logo.svg" alt="Maddisun Logo" width={40} height={40} />
                </motion.div>
                <div className="leading-none tracking-normal text-[#32B18A] space-y-0">
                  <motion.h4 
                    className="font-bold text-xl"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Maddisun
                  </motion.h4>
                  <motion.h5 
                    className="font-semibold text-sm mt-[-2px]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Ventures LLP
                  </motion.h5>
                </div>
              </Link>
              <motion.button 
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image className="h-6 w-6" src="/close.svg" alt="Close menu" width={24} height={24} />
              </motion.button>
            </motion.div>
            
            {/* Navigation links */}
            <nav className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <Link 
                    href={link.url}
                    className="block py-4 px-5 border-b border-gray-100 text-lg text-[#5F6980] hover:text-[#F69220] hover:bg-[#f5f5f5] transition-colors active:text-[#F69220]"
                    onClick={onClose}
                  >
                    <motion.span 
                      className="inline-block w-full"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {link.title}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Contact us button */}
            <motion.div 
              className="px-5 py-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + navLinks.length * 0.1 }}
            >
              <Link 
                href="/products?active-step=3" 
                onClick={onClose}
              >
                <motion.div 
                  className="flex justify-center items-center gap-2 bg-[#FFA943] text-white py-3 px-4 rounded-full text-lg w-full"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 4px 8px rgba(246, 146, 32, 0.3)" 
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <p>Contact Us</p>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    <Image className="h-5 w-5" src="/arrow-up-right.svg" alt="Contact Us" width={20} height={20} />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}