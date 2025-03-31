import Image from "next/image";
import ExceptionalQualityContactUsSection from "@/app/components/homepage/ExceptionalQualityContactUsSection";
import BlogCategory from "@/app/components/blogs/BlogCategory";
import Link from "next/link";
import BlogSection from "@/app/components/blogs/BlogSection";

type BlogsCategory = {
    params: Promise<any>
}
export default async function Blogs({ params }: BlogsCategory) {

    let { category } = await params;

    return (
        <div className="relative flex flex-col items-center w-full overflow-hidden">

            {/* heading section */}
            <section className="relative bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] h-fit w-full px-5 py-6 md:px-8 lg:px-10 md:py-10">

                <Image src="/homepage/section-upper-design.svg" className="absolute top-0 left-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto -z-10" alt="section-design" height={500} width={500} />

                <div className="z-10 flex flex-col gap-5 md:gap-10">
                    <p className="text-2xl md:text-5xl font-bold  lg:w-3/4">Top and noteworthy stories from the pharmaceutical industry</p>
                    <div className="flex flex-row gap-2 items-center ">
                        <Link href="/blogs" className="py-1 px-4 bg-blue-200 rounded-lg text-lg font-semibold md:font-bold cursor-pointer">All</Link>
                        <span className="font-semibold text-2xl">&#8827;</span>
                        <button className="py-1 px-4 bg-blue-200 rounded-lg text-lg font-semibold md:font-bold">{category.replace("%20", " ")}</button>
                    </div>
                </div>

                {/* categories section */}
                <div className="h-fit w-full flex flex-col-reverse lg:flex-row my-[2rem]">
                    <div className="w-full lg:w-2/3 ">
                        <BlogSection category={category}/>
                    </div>
                    <div className="w-full md:w-2/3 lg:w-1/3  px-2 lg:pt-10 mx-auto">
                        <Image src="/blogs/image-1.jpg" className="w-full h-[15rem] rounded-lg" height={500} width={500} alt="blog category image" />
                    </div>
                </div>


            </section>



            {/* section-3 */}
            <ExceptionalQualityContactUsSection />
        </div>
    )
}