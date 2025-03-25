import Image from 'next/image'
import React from 'react'

type props = {
    id: string,
    image: string,
    category_name: string,
    date: string,
    story: string
}
const BlogCategoryCard = ({id, image, category_name, date, story}:props) => {
  return (
    <div className='bg-white shadow-xl shadow-[#DCF5EC] rounded-2xl border border-gray-200 w-full md:w-[45%] lg:w-[26%] cursor-pointer'>
        <Image className="w-full h-[10rem] rounded-t-2xl" height={500} width={500} src={image} alt="blog category image" />
        <div className='flex flex-row text-xs border-2 border-[#DCF5EC] mx-auto w-[80%] justify-between my-5 rounded-lg'>
            <p className='font-bold bg-[#DCF5EC] text-center flex-1/2 py-1'>{category_name}</p>
            <p className='font-bold  text-center flex-1/2 py-1 text-gray-700 '>{date}</p>
        </div>
        <p className='text-lg font-semibold text-center w-[80%] mx-auto text-gray-700 my-4'>{story}</p>
    </div>
  )
}

export default BlogCategoryCard