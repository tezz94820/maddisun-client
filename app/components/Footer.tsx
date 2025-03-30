import Image from "next/image";
import Link from "next/link";

const socialMediaLinks = [
  {
    title: "twitter",
    icon: "/twitter.svg",
    href: "http://twitter.com"
  },
  {
    title: "linkedin",
    icon: "/linkedin.svg",
    href: "http://www.linkedin.com"
  },
  {
    title: "instagram",
    icon: "/instagram.svg",
    href: "http://instagram.com"
  }
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#32B18A]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start py-5 px-5 md:px-8 lg:px-20">
        <div className="lg:w-1/2 mx-auto">
          <Link href="/" className="flex flex-row justify-center md:justify-start gap-2">
            <Image className="h-12 w-12 md:h-15 md:w-15" src="/logo.svg" alt="Maddisun Logo" width={50} height={50} />
            <div className="leading-none tracking-normal text-[#32B18A] space-y-0" >
              <h4 className="font-bold text-lg md:text-2xl">Maddisun</h4>
              <h5 className="font-semibold text-xs md:text-base mt-[-2px]">Ventures LLP</h5>
            </div>
          </Link>
          <p className="mt-4 lg:pr-30 text-justify">WeWork, Raheja Platinum, Sag Baug Road,Off Andheri-Kurla Road, Marol, Andheri (E),Mumbai-400059, Maharashtra, India.</p>
          <div className="hidden md:flex flex-col">
            <div className="mt-4 text-[#006B4F] flex flex-col gap-4 ">
              <Link href="mailto:info@maddisun.com" className="underline cursor-pointer">info@maddisun.com</Link>
              <Link href="tel:+919870563634" className="cursor-pointer underline">+91&nbsp;9870563634</Link>
            </div>
            <div className="flex flex-row gap-6 mt-4">
              {
                socialMediaLinks.map((mediaLink, index) => (
                  <Link href={mediaLink.href} key={index}>
                    <Image className="h-8 w-8" src={mediaLink.icon} alt={mediaLink.title} width={30} height={30} />
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 h-full md:pl-30 mt-5">
          <p className="text-justify">Maddisun Ventures boasts a team of seasoned industry professionals dedicated to delivering top-quality Active Pharmaceutical Ingredients and Intermediates.</p>
          <div className="flex flex-row justify-between mt-5 md:mt-10 w-3/4 mx-auto md:mx-0">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Company</h3>
              <Link href="/" className="hover:underline cursor-pointer">Home</Link>
              <Link href="/#aboutus-section" className="hover:underline cursor-pointer">About Us</Link>
              <Link href="/#testimonial-section" className="hover:underline cursor-pointer">Testimonial</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold ">Resource</h3>
              <p className="hover:underline cursor-pointer">FAQs</p>
              <Link href="/blogs" className="hover:underline cursor-pointer">Blog</Link>
              <Link href="/products?active-step=3" className="hover:underline cursor-pointer">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:hidden">
        <div className="mt-4 text-[#006B4F] flex flex-col gap-2 ">
          <Link href="mailto:info@maddisun.com" className="underline cursor-pointer">info@maddisun.com</Link>
          <Link href="tel:+919870563634" className="cursor-pointer underline">+91&nbsp;9870563634</Link>
        </div>
        <div className="flex flex-row gap-6 mt-4">
          {
            socialMediaLinks.map((mediaLink, index) => (
              <Link href={mediaLink.href} key={index}>
                <Image className="h-8 w-8" src={mediaLink.icon} alt={mediaLink.title} width={30} height={30} />
              </Link>
            ))
          }
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <p>© 2025 Maddison healthcare</p>
      </div>
    </footer>
  )
}