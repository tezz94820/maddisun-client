"use client"

import Image from "next/image";
import section2List from '@/app/data/homepageSection2.json';
import section3CheckData from '@/app/data/homepageSection3.json';
import TestimonialCard from "../components/TestimonialCard/TestimonialCard";
import testimonialData from "@/app/data/homepageTestimonialData.json";
import Link from "next/link";
import ExceptionalQualityContactUsSection from "../components/homepage/ExceptionalQualityContactUsSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center ">

      {/* section - 1 */}
      <section className="relative bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] h-[36rem] md:h-[38rem] lg:h-[40rem] w-full">
        <Image src="/homepage/section-upper-design.svg" className="absolute top-0 left-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-0" alt="section-design" height={500} width={500} />

        <div className="flex flex-col-reverse md:flex-row justify-between h-full w-full absolute z-10 px-5 py-12 md:px-8 lg:px-10 md:py-34 ">

          {/* left content */}
          <motion.div initial={{ opacity:0, y: 100}} whileInView={{opacity:1, y: 0}} viewport={{once: true}} transition={{duration:1}} className="flex flex-col gap-4 md:w-1/2">
            <div className="hidden md:flex flex-row gap-5 items-center">
              <Image className="h-12 w-12 md:h-25 md:w-25 lg:h-38 lg:w-38" src="/logo.svg" alt="Maddisun Logo" width={100} height={100} />
              <div className="leading-none tracking-normal text-[#32B18A] space-y-0" >
                <h4 className="font-bold text-lg md:text-5xl lg:text-7xl">Maddisun</h4>
                <h5 className="font-bold text-base md:text-3xl lg:text-5xl">Ventures</h5>
              </div>
            </div>
            <article className="font-semibold text-xl md:text-3xl">Excellence, innovation & reliability in every pharmaceutical ingredient</article>
            <Link href="/products" className="flex flex-row w-fit gap-1 cursor-pointer bg-[#FFA943] text-white py-1 px-2 md:py-2 md:px-4 rounded-lg hover:underline text-2xl">
              <p className="text-base lg:text-xl">Check our products</p>
              <Image className="h-7 w-7" src="/arrow-up-right.svg" alt="arrow up right" width={30} height={30} />
            </Link>
          </motion.div>

          {/* right content */}
          <motion.div initial={{ opacity:0}} whileInView={{opacity:1}} viewport={{once: true}} transition={{duration:1}} className="relative md:top-[-5rem]">
            <Image src="/homepage/image-1.png" className="h-auto w-[25rem] md:h-auto md:w-[32rem] " alt="section-design" height={500} width={500} />
          </motion.div>
        </div>
        <Image src="/homepage/section-lower-design.svg" className="absolute bottom-0 right-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-0 " alt="section-design" height={500} width={500} />
      </section>

      {/* section - 2 */}

      <section className="w-full h-fit flex flex-col items-center gap-5 px-5 md:px-8 lg:px-10 py-5 md:py-10">
        <div className="flex flex-row items-center md:gap-10 lg:gap-20 w-full">
          {/* left */}
          <motion.div initial={{opacity:0, x: -100}} whileInView={{opacity:1, x: 0}} viewport={{once: true}} transition={{duration:1}} className="hidden md:block h-fit w-fit">
            <Image src="/homepage/image-2.png" className="h-[30rem] lg:h-[38rem] w-[60rem]" alt="bottle of tablets" height={500} width={500} />
          </motion.div>
          {/* right */}
          <motion.article initial={{opacity:0, x:40}} whileInView={{opacity:1,x:0}} viewport={{once: true}} transition={{duration:1}}>
            <h2 className="font-bold text-2xl/10 md:text-4xl/10 ">India's Leading Hub for Pharmaceutical Excellence</h2>
            {
              section2List.map((item, index) => (
                <div key={index} className="mt-8 md:w-5/6">
                  <span className="flex flex-row items-center justify-start ">
                    <Image src={item.icon} className="h-[1.5em] w-[1.5em]" alt="medal" height={10} width={10} />
                    <span className="ml-1.5 font-bold text-base md:text-xl leading-normal">{item.title}</span>
                  </span>
                  <p className="mt-3 text-sm md:text-lg text-[#5F6980]">{item.description}</p>
                </div>
              ))
            }
          </motion.article>
        </div>
        <motion.button initial={{opacity:0,y:20}}  whileInView={{opacity:1,y:0}} viewport={{once: true}} transition={{duration:1}} className="bg-[#3AA76D] text-white rounded-xl w-full lg:w-3/4 px-3 md:px-2 py-3 md:py-6 font-bold text-2xl md:text-4xl"> 
          Trusted by 500+ clients
        </motion.button>
      </section>

      {/* section - 3 */}

      <section id="aboutus-section" className="w-full h-fit flex flex-row items-center gap-5 bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] px-5 md:px-8 lg:px-10 py-5 md:py-10">
        <motion.div initial={{opacity:0, x:-40}} whileInView={{opacity:1,x:0}} viewport={{once: true}} transition={{duration:1}} className="md:w-5/8 flex flex-col gap-8 md:gap-10 ">
          <button className="border-2 border-[#509E49] text-[#509E49] rounded-full px-4 py-2 w-fit ">About US</button>
          <h3 className="font-bold text-2xl md:text-4xl mt-1 md:mt-5">We deliver precision and quality in pharmaceutical ingredients, upholding the highest standards in every product.</h3>
          <motion.div initial={{opacity:0, x:20}} whileInView={{opacity:1, x:0, transition:{staggerChildren: 2}}} viewport={{once: true}} className="grid grid-cols-1 lg:grid-cols-2 flex-wrap gap-3 lg:gap-5 md:gap-10 lg:w-7/8 mt-2 md:mt-8">
            {
              section3CheckData.map((item, index) => (
                <div key={index} className="flex flex-row items-center gap-2">
                  <Image src="/homepage/checks.svg" className="h-[1.5em] w-[1.5em]" alt="checkmark" height={20} width={20} />
                  <p className="md:text-xl text-lg font-medium leading-normal text-[#5F6980]">{item}</p>
                </div>
              ))
            }
          </motion.div>
          <Link href="/products?active-step=3" className="flex flex-row gap-1 items-center cursor-pointer">
            <p className="text-[#F39424] font-semibold text-lg md:text-xl underline underline-offset-4 leading-normal">Get to Know Us</p>
            <Image src="/homepage/arrow-right.svg" className="h-[1.5em] w-[1.5em]" alt="right arrow symbol" width={10} height={10} />
          </Link>
        </motion.div>
        <motion.div initial={{opacity:0, x:20}} whileInView={{opacity:1,x:0}} viewport={{once: true}} transition={{duration:1}}className="hidden md:block h-fit w-fit">
          <Image src="/homepage/image-3.png" className="hidden md:block h-[30rem] lg:h-[38rem] w-auto" alt="bottle of tablets" height={500} width={500} />
        </motion.div>
      </section>

      {/* section - 4 */}
      <motion.section initial={{opacity:0, y:100}} whileInView={{opacity:1,y:0}} viewport={{once: true}} transition={{duration:1}} className="relative w-full h-fit flex flex-row items-center gap-5 bg-[radial-gradient(circle_at_right,_#DCF5EC_0%,_transparent_50%)] px-5 md:px-8 lg:px-10 py-5 md:py-10">
        <Image src="/homepage/section4Design.svg" className=" hidden md:block absolute h-[10rem] md:h-[15rem] lg:h-[20rem] w-[30rem] z-0 left-[-2.5rem] lg:left-0 bottom-1/5" alt="section-design" height={500} width={500} />

        <div className="flex flex-col sm:items-center gap-6 md:gap-10 mx-auto z-10">
          <button className="border-2 border-[#509E49] text-[#509E49] rounded-full px-4 py-2 w-fit ">Our Milestones</button>
          <p className="font-bold text-3xl md:text-5xl sm:text-center">Step into the Maddissun Experience</p>
          <p className="lg:w-3/4 text-[#5F6980] md:text-center font-normal text-lg">At Maddisun Ventures, our unwavering dedication to producing top-quality Active Pharmaceutical Ingredients and Intermediates is reflected in our significant achievements. From industry accolades to glowing testimonials, each milestone underscores our commitment to excellence</p>
        </div>
      </motion.section>

      {/* section-5 */}

      <section className="relative w-full h-fit flex flex-col md:flex-row gap-8 lg:gap-20 bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] px-5 md:px-8 lg:px-10 py-5 md:py-10">
        <button className="md:hidden border-2 border-[#509E49] text-[#509E49] rounded-full px-4 py-2 w-fit ">Insights from Our CEO</button>
        <Image src="/homepage/image-4.png" className="w-full h-auto md:h-[24rem] md:w-[20rem] lg:h-[24rem] lg:w-[24rem] rounded-4xl" alt="CEO image" height={1000} width={1000} />
        <motion.div initial={{opacity:0, x:40}} whileInView={{opacity:1,x:0}} viewport={{once: true}} transition={{duration:1}} className="flex flex-col gap-5 lg:gap-10">
          <button className="hidden md:block border-2 border-[#509E49] text-[#509E49] rounded-full px-4 py-2 w-fit ">Insights from Our CEO</button>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl tracking-tighter">Innovation is the cornerstone of our strategy.</h3>
            <p className="text-lg">Our goal isn’t just to keep up with industry standards, but to set them. With a focus on pioneering solutions, we ensure our clients stay at the forefront of the pharmaceutical ingredients landscape.</p>
          </div>
          <Link href="/products?active-step=3" className="flex flex-row gap-1 items-center cursor-pointer">
            <p className="text-[#F39424] font-semibold text-lg md:text-xl underline underline-offset-4 leading-normal">Get to Know Us</p>
            <Image src="/homepage/right-up-arrow.svg" className="h-[1.5em] w-[1.5em]" alt="right arrow symbol" width={10} height={10} />
          </Link>
        </motion.div>
      </section>

      {/* section-6 */}
      <section id="testimonial-section" className="relative w-full h-fit flex flex-col lg:flex-row gap-8 lg:gap-20 bg-[radial-gradient(circle_at_top_left,_#DCF5EC_0%,_transparent_50%)] px-5 md:px-8 lg:px-10 py-5 md:py-10">

        <div className="relative lg:hidden h-fit w-full">
          <Image src="/homepage/world-map.svg" className="right-0 top-0 z-0 " alt="world map" height={1000} width={1000} />
          <div className="absolute top-1/2 left-0 flex justify-center my-auto z-10 w-full">
            <p className="z-10 text-[#5F6980] font-bold text-xl md:text-4xl text-center ">with services in over 10+ countries</p>
          </div>
        </div>

        <Image src="/homepage/world-map.svg" className="hidden lg:block md:absolute right-0 top-0 z-0" alt="world map" height={1000} width={1000} />

        <div className="flex flex-col gap-5 z-10 w-full">

          <motion.div initial={{opacity:0, y:100}} whileInView={{opacity:1,y:0}} viewport={{once: true}} transition={{duration:1}} className="md:text-center flex flex-col gap-4">
            <h3 className="text-3xl md:text-5xl font-bold">Experience the Maddisun Advantage</h3>
            <p className="text-[#4B4B4B] text-lg md:text-xl font-medium">Explore How Maddisun Ventures Is Transforming Lives</p>
          </motion.div>

          <div className="flex flex-row justify-between items-center mt-5">
            <div className="flex flex-col gap-10 ">
              {
                testimonialData.map(item => (
                  <TestimonialCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    tagLine={item.tagLine}
                    stars={item.stars}
                    content={item.content}
                  />
                ))
              }
            </div>
            <div className="hidden lg:block h-max w-fit text-center">
              <p className="font-semibold text-xl ">with services in over</p>
              <p className="font-bold text-4xl ">10+ countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* section-7  */}
      <ExceptionalQualityContactUsSection />


      {/* section-8 */}
      {/* watsapp-logo section */}
      <div className="absolute">
        <Link href="https://wa.me/919870563634?text=I'm%20interested%20in%20Maddisun%20Healthcare" target="_blank" rel="noopener noreferrer">
          <Image src="/homepage/watsapp-logo.svg" className="h-[6rem] w-[6rem] right-0 bottom-0 z-100 fixed " alt="watsapp-logo" height={100} width={100} />
        </Link>      
      </div>

    </div>
  );
}
