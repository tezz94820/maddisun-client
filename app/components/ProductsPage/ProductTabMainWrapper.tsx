'use client';

import { motion, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import SelectProductsTab from "./SelectProductsTab";
import FinaliseListTab from "./FinaliseListTab";
import SendEnquiryTab from "./SendEnquiryTab";
import axios from "axios";
import { ProductType, SendEnquiryFormdataType } from "@/types/product";

const steps = [
    { id: 1, web_label: "Select your products", mobile_label: "Select" },
    { id: 2, web_label: "Finalise list of selected products", mobile_label: "Finalise list" },
    { id: 3, web_label: "Send enquiry", mobile_label: "Send enquiry" }
];

const variants = {
    next: { x: "100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    prev: { x: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    active: { x: "0%", opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
};

const initialFormdata: SendEnquiryFormdataType = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
}

const ProductTabMainWrapper = () => {
    // Get active step from local storage or default to 1
    const [activeStep, setActiveStep] = useState(1);
    const [direction, setDirection] = useState("next");
    
    // Initialize states from local storage if available
    const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
    const [formdata, setFormdata] = useState<SendEnquiryFormdataType>(initialFormdata);
    
    // Load saved data from localStorage on component mount
    useEffect(() => {
        // Check if we're in a browser environment (not SSR)
        if (typeof window !== 'undefined') {
            try {
                // Retrieve selected products
                const savedProducts = localStorage.getItem('selectedProducts');
                if (savedProducts) {
                    setSelectedProducts(JSON.parse(savedProducts));
                }
                
                // Retrieve form data
                const savedFormData = localStorage.getItem('enquiryFormData');
                if (savedFormData) {
                    setFormdata(JSON.parse(savedFormData));
                }
            } catch (error) {
                console.error('Error loading data from localStorage:', error);
                // If there's an error (e.g., corrupt data), use default values
            }
        }
    }, []);
    
    // Save selected products to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        }
    }, [selectedProducts]);
    
    // Save form data to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('enquiryFormData', JSON.stringify(formdata));
        }
    }, [formdata]);

    const handleStepChange = (step: number) => {
        setDirection(step > activeStep ? "next" : "prev");
        setActiveStep(step);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // Determine swipe direction based on drag velocity and direction
        const { offset, velocity } = info;
        
        // Threshold for considering a swipe (adjust as needed)
        const swipeThreshold = 100;
        const velocityThreshold = 500;

        // Swipe right (move to previous step)
        if ((offset.x > swipeThreshold && velocity.x > velocityThreshold) || 
            (offset.x > swipeThreshold && activeStep > 1)) {
            if (activeStep > 1) {
                handleStepChange(activeStep - 1);
            }
        } 
        // Swipe left (move to next step)
        else if ((offset.x < -swipeThreshold && velocity.x < -velocityThreshold) || 
                 (offset.x < -swipeThreshold && activeStep < 3)) {
            if (activeStep < 3) {
                handleStepChange(activeStep + 1);
            }
        }
    };

    // Function to clear storage (can be used after successful form submission)
    const clearStoredData = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('activeStep');
            localStorage.removeItem('selectedProducts');
            localStorage.removeItem('enquiryFormData');
        }
    };

    return (
        <>
            <div className={`flex flex-row items-center lg:w-8/9 relative`}>
                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-row items-center cursor-pointer gap-1 md:gap-4 w-1/3" onClick={() => handleStepChange(step.id)} >
                        <div className={`h-5 w-5 md:w-6 md:h-6 flex items-center justify-center rounded-full text-white ${activeStep === step.id ? "bg-orange-500" : "bg-gray-500"}`}>
                            {step.id}
                        </div>
                        <span className={`hidden lg:block mt-1 text-sm align-middle ${activeStep === step.id ? "font-semibold text-black" : "text-gray-500"}`}>
                            {step.web_label}
                        </span>
                        <span className={`lg:hidden mt-1 text-sm align-middle ${activeStep === step.id ? "font-semibold text-black" : "text-gray-500"}`}>
                            {step.mobile_label}
                        </span>
                    </div>
                ))}

                {/* Animated Underline */}
                <motion.div
                    className="absolute -bottom-4 h-1 bg-orange-500 rounded transition-all z-20"
                    initial={{ x: "0%", width: "20%" }} // Start at first step
                    animate={{
                        x: `${(activeStep - 1) * 100}%`, // Move by 100% of width per step
                        width: "33.33%", // Keep width consistent
                    }}
                    transition={{
                        duration: 0.4, // Controls the speed of animation
                        ease: "easeInOut", // Smooth easing for natural movement
                    }}
                />
                <hr className="absolute -bottom-4 h-0.5 w-full bg-gray-200 rounded z-10" />
            </div>
            <div className="mt-8 relative overflow-hidden">
                <motion.div
                    key={activeStep} // Re-renders component when step changes
                    variants={variants}
                    initial={direction === "next" ? "next" : "prev"}
                    animate="active"
                    exit={direction === "next" ? "prev" : "next"}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={handleDragEnd}
                    className="w-full cursor-grab active:cursor-grabbing"
                >
                    {activeStep === 1 && <SelectProductsTab setActiveStep={setActiveStep} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>}
                    {activeStep === 2 && <FinaliseListTab setActiveStep={setActiveStep} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />}
                    {activeStep === 3 && (
                        <SendEnquiryTab 
                            setActiveStep={setActiveStep} 
                            selectedProducts={selectedProducts} 
                            formdata={formdata} 
                            setFormdata={setFormdata}
                            clearStoredData={clearStoredData} // Pass the clear function for use after successful submission
                        />
                    )}
                </motion.div>
            </div>
        </>
    )
}

export default ProductTabMainWrapper