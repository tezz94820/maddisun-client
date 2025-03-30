import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ExceptionalQualityContactUsSection = () => {
    return (
        <section className="relative w-full h-fit flex flex-col lg:flex-row gap-8 lg:gap-20 bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] px-5 md:px-8 lg:px-20 py-5 md:py-10">
            <Image src="/homepage/section-left-design.svg" className="absolute bottom-0 lg:bottom-auto lg:top-[-2rem] lg:left-[-10rem] left-[-6rem] h-[10rem] md:h-[15rem] lg:h-[20rem] w-full md:w-auto z-0" alt="section-design" height={500} width={500} />
            <div className="flex flex-col lg:items-center gap-10 z-10">
                <p className="lg:text-center font-bold text-2xl md:text-5xl text-[#F69220]">Take the First Step Towards Exceptional Quality and Innovation in Pharmaceuticals</p>
                <Link href="/products?active-step=3" className="flex flex-row gap-1 items-center justify-center cursor-pointer bg-[#49AD8F] rounded-full px-4 py-2 w-fit">
                    <p className="text-white font-semibold text-lg md:text-xl leading-normal">Contact Us</p>
                    <Image src="/homepage/right-up-white-arrow.svg" className="h-[1.5em] w-[1.5em]" alt="right arrow white symbol" width={10} height={10} />
                </Link>
            </div>
        </section>
    )
}

export default ExceptionalQualityContactUsSection