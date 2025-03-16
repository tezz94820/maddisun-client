import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <section className="relative bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] h-[36rem] md:h-[38rem] lg:h-[40rem] w-full">
        <Image src="/homepage/section-upper-design.svg" className="absolute top-0 left-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-0" alt="section-design" height={500} width={500} />
        
        <div className="flex flex-col-reverse md:flex-row justify-between h-full w-full absolute z-10 px-5 py-12 md:px-8 lg:px-10 md:py-34 ">
          
          {/* left content */}
          <div className="flex flex-col gap-4 md:w-1/2">
            <div className="hidden md:flex flex-row gap-5 items-center">
              <Image className="h-12 w-12 md:h-25 md:w-25 lg:h-38 lg:w-38" src="/logo.svg" alt="Maddisun Logo" width={100} height={100} />
              <div className="leading-none tracking-normal text-[#32B18A] space-y-0" >
                <h4 className="font-bold text-lg md:text-5xl lg:text-7xl">Maddisun</h4>
                <h5 className="font-semibold text-xs md:text-3xl lg:text-4xl">Ventures LLP</h5>
              </div>
            </div>
            <article className="font-semibold text-xl md:text-3xl">Excellence, innovation & reliability in every pharmaceutical ingredient</article>
            <button className="flex flex-row w-fit gap-1 cursor-pointer bg-[#FFA943] text-white py-1 px-2 md:py-2 md:px-4 rounded-lg hover:underline font-semibold text-2xl">
              <p className="text-lg md:text-xl">Check our products</p>
              <Image className="h-6 w-6" src="/arrow-up-right.svg" alt="Contact Us" width={30} height={30} />
            </button>
          </div>

          {/* right content */}
          <div className="relative md:top-[-5rem]">
            <Image src="/homepage/image-1.png" className="h-auto w-[25rem] md:h-auto md:w-[32rem] " alt="section-design" height={500} width={500} />
          </div>
        </div>
        <Image src="/homepage/section-lower-design.svg" className="absolute bottom-0 right-0 h-[10rem] md:h-[15rem] lg:h-[20rem] w-auto z-0 " alt="section-design" height={500} width={500} />
      </section>
    </div>
  );
}
