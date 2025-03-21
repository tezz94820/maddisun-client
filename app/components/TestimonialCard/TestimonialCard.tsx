import Image from "next/image"
import TestimonialCardStars from "./TestimonialCardStars"

type TestimonialProps = {
  icon: string,
  title: string,
  tagLine: string,
  stars: number,
  content: string
}
export default function TestimonialCard({ icon, title, tagLine, stars, content }: TestimonialProps) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 lg:w-[34rem] h-fit">
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-row items-center gap-2">
          <Image src={icon} className="h-14 w-14" alt="testimonial logo" height={200} width={200} />
          <div className="flex flex-col ml-4">
            <p className="font-bold text-xl md:text-2xl" >{title}</p>
            <p className="font-medium text-lg md:text-xl">{tagLine}</p>
          </div>
        </div>
        <div className="flex flex-row gap-5 ">
          <TestimonialCardStars rating={stars}/>
          <p className="font-bold">•</p>
          <p className="font-bold">{stars}/5</p>
        </div>
        <div>
            <p className="text-[#5F6980] text-base md:text-lg">"{content}"</p>
        </div>
      </div>
    </div>
  )
}