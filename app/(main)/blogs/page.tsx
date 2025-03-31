import Image from "next/image";
import ExceptionalQualityContactUsSection from "@/app/components/homepage/ExceptionalQualityContactUsSection";
import BlogCategory from "@/app/components/blogs/BlogCategory";

export default function Blogs() {

    return (
        <div className="relative flex flex-col items-center w-full overflow-hidden">

            {/* heading section */}
            <section className="relative bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_80%)] h-fit w-full px-5 py-6 md:px-8 lg:px-10 md:py-10">

                <Image src="/homepage/section-upper-design.svg" className="absolute top-0 left-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto -z-10" alt="section-design" height={500} width={500} />

                <div className="z-10 flex flex-col gap-5 md:gap-10">
                    <p className="text-2xl md:text-5xl font-bold  lg:w-3/4">Top and noteworthy stories from the pharmaceutical industry</p>
                    <p className="text-2xl font-semibold text-[#5F6980]">In the spotlight</p>
                </div>

                {/* categories section */}
                <div className="h-fit w-full">
                    <BlogCategory />
                </div>


            </section>



            {/* section-3 */}
            <ExceptionalQualityContactUsSection />
        </div>
    )
}