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

export default function Products() {

    const [activeStep, setActiveStep] = useState(1);
    const [direction, setDirection] = useState("next");

    const handleStepChange = (step: number) => {
        setDirection(step > activeStep ? "next" : "prev"); 
        setActiveStep(step);
    };


    return (
        <div className="relative flex flex-col items-center w-full overflow-hidden">

            <section className="relative w-full h-fit flex flex-col lg:flex-row gap-8 lg:gap-20 bg-[radial-gradient(circle_at_top_left,_#DCF5EC_0%,_transparent_50%)] px-5 md:px-8 lg:px-20 py-5 md:py-10">

                <Image src="/products/design-top-right.svg" className="absolute -top-[3rem] -right-[3rem] md:-top-[6rem] md:-right-[5rem] h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-0" alt="section-design" height={500} width={500} />

                <div className="flex flex-col gap-5 z-10">
                    <h2 className="text-2xl md:text-4xl font-bold lg:w-6/8">Choose form the list of finest ingredients, or search for what you need</h2>
                    <p className="text-2xl text-[#5F6980] font-semibold">How it works?</p>

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
                            className="w-full"
                        >
                            {activeStep === 1 && <SelectProductsTab setActiveStep={setActiveStep} />}
                            {activeStep === 2 && <FinaliseListTab setActiveStep={setActiveStep} />}
                            {activeStep === 3 && <SendEnquiryTab />}
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative w-full h-fit px-5 md:px-8 lg:px-10 py-5 md:py-10 bg-[radial-gradient(circle_at_top_left,_#DCF5EC_0%,_transparent_50%)]">
                <Image src="/homepage/section-lower-design.svg" className="absolute -top-[5rem] md:-top-[10rem] -right-[2rem] h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-[-10]" alt="section-design" height={500} width={500} />
                <div className="w-full flex flex-col md:flex-row items-center gap-5 z-10">
                    <div className="md:w-1/2">
                        <Image src="/homepage/image-2.png" className="md:block h-[15rem] md:h-[24rem] lg:h-[30rem] w-auto" alt="bottle of tablets" height={500} width={500} />
                    </div>
                    <article className="md:w-1/2">
                        <h2 className="font-bold text-2xl/10 md:text-4xl/10 ">How it works?</h2>
                        <div className="mt-8 md:w-5/6 flex flex-col gap-5">
                            <p>
                                <span className="flex flex-row items-center justify-start">
                                    <span className={`h-5 w-5 md:w-6 md:h-6 flex items-center justify-center rounded-full text-white bg-gray-500`}>1</span>
                                    <span className="ml-1.5 font-bold text-base md:text-xl leading-normal">Select your products</span>
                                </span>
                                <span className="text-sm md:text-lg text-[#5F6980]">Choose API's Intermediates, Speciality ingredients of your choice</span>
                            </p>
                            <p>
                                <span className="flex flex-row items-center justify-start">
                                    <span className={`h-5 w-5 md:w-6 md:h-6 flex items-center justify-center rounded-full text-white bg-gray-500`}>2</span>
                                    <span className="ml-1.5 font-bold text-base md:text-xl leading-normal">Finalise list of selected products</span>
                                </span>
                                <span className="text-sm md:text-lg text-[#5F6980]">Check the list of selected products</span>
                            </p>
                            <p>
                                <span className="flex flex-row items-center justify-start">
                                    <span className={`h-5 w-5 md:w-6 md:h-6 flex items-center justify-center rounded-full text-white bg-gray-500`}>3</span>
                                    <span className="ml-1.5 font-bold text-base md:text-xl leading-normal">Send Enquiry</span>
                                </span>
                                <span className="text-sm md:text-lg text-[#5F6980]">Enter your Email ID and send enquiry, our team will get back to you in 24 hrs</span>
                            </p>
                        </div>
                    </article>
                </div>

            </section>

            {/* section-3 */}
            <ExceptionalQualityContactUsSection />
        </div>
    )
}