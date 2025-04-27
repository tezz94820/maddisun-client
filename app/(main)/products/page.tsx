"use client"

import Image from "next/image";
import ExceptionalQualityContactUsSection from "@/app/components/homepage/ExceptionalQualityContactUsSection";
import ProductTabMainWrapper from "@/app/components/ProductsPage/ProductTabMainWrapper";
import { Suspense } from "react";

export default function Products() {
    return (
        <div className="relative flex flex-col items-center w-full overflow-hidden">

            <section className="relative w-full h-fit flex flex-col lg:flex-row gap-8 lg:gap-20 bg-[radial-gradient(circle_at_top_left,_#DCF5EC_0%,_transparent_10%)] px-5 md:px-8 lg:px-20 py-5 md:py-10">

                <Image src="/products/design-top-right.svg" className="absolute -top-[3rem] -right-[3rem] md:-top-[6rem] md:-right-[5rem] h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-0" alt="section-design" height={500} width={500} />

                <div className="flex flex-col gap-5 z-10">
                    <h2 className="text-2xl md:text-4xl font-bold lg:w-6/8">Choose form the list of finest ingredients, or search for what you need</h2>
                    <p className="text-2xl text-[#5F6980] font-semibold">How it works?</p>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductTabMainWrapper />
                    </Suspense>
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