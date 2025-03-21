import Image from "next/image"

type TestimonialCardStarsProps = {
    rating: number
}
export default function TestimonialCardStars({ rating }: TestimonialCardStarsProps) {
    
    const totalStars = 5;
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 === 0.5 ? 1 : 0; 
    const emptyStars = totalStars - fullStars - halfStar; 

    return (
        <div className="flex flex-row">
            {Array.from({ length: fullStars }, (_, index) => (
                <Image key={index} src="/homepage/testimonials/full-star.svg" className="h-6 w-6" alt="star" height={50} width={50} />
            ))}
            {Array.from({ length: halfStar }, (_, index) => (
                <Image key={index} src="/homepage/testimonials/half-star.svg" className="h-6 w-6" alt="star" height={50} width={50} />
            ))}
            {Array.from({ length: emptyStars }, (_, index) => (
                <Image key={index} src="/homepage/testimonials/empty-star.svg" className="h-6 w-6" alt="star" height={50} width={50} />
            ))}
        </div>
    )
}