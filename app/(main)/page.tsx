import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <section className="relative bg-[radial-gradient(circle_at_top_right,_#DCF5EC_0%,_transparent_50%)] h-[40rem] w-full">
        <Image src="/homepage/section-upper-design.svg" className="absolute top-0 left-0 h-[20rem] z-0" alt="section-design" height={500} width={500} />
        
        <div className="flex flex-col-reverse sm:flex-row justify-between  h-full w-full absolute z-10 px-5 sm:px-10 sm:py-34 border-yellow-500">
          
          {/* left content */}
          <div className="flex flex-col gap-4 sm:w-1/2 ">
            <div className="hidden sm:flex flex-row gap-5 items-center">
              <Image className="h-12 w-12 lg:h-38 lg:w-38" src="/logo.svg" alt="Maddisun Logo" width={100} height={100} />
              <div className="leading-none tracking-normal text-[#32B18A] space-y-0" >
                <h4 className="font-bold text-lg lg:text-7xl">Maddisun</h4>
                <h5 className="font-semibold text-xs lg:text-4xl">Ventures LLP</h5>
              </div>
            </div>
            <article className="font-semibold text-base sm:text-3xl">Excellence, innovation & reliability in every pharmaceutical ingredient</article>
            <button className="flex flex-row w-fit gap-1 cursor-pointer bg-[#FFA943] text-white py-1 px-2 lg:py-2 lg:px-4 rounded-lg hover:underline font-semibold text-2xl">
              <p className="text-base lg:text-xl">Check our products</p>
              <Image className="h-6 w-6" src="/arrow-up-right.svg" alt="Contact Us" width={30} height={30} />
            </button>
          </div>

          {/* right content */}
          <div className="relative top-[-5rem]">
            <Image src="/homepage/image-1.png" className="h-[32rem] w-[32rem] " alt="section-design" height={500} width={500} />
          </div>
        </div>
        <Image src="/homepage/section-lower-design.svg" className="absolute bottom-0 right-0 h-[20rem] z-0 " alt="section-design" height={500} width={500} />
      </section>
    </div>
  );
}
