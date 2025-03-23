import Image from 'next/image'
import React from 'react'

const typeList = ["API", "ABC", "BCD"];
const productsList = [
    {
        id: 1,
        name: 'Product Product  Product  ProductPro duct Produc tPr oduct Product Product Product  ',
        casNo: '1234567890',
        endUse: 'Product for XYZ',
        type: 'API',
        selected: false
    },
    {
        id: 2,
        name: 'Product 2',
        casNo: '1234567890',
        endUse: 'Product for XYZ',
        type: 'API',
        selected: false
    },
    {
        id: 3,
        name: 'Product 3',
        casNo: '1234567890',
        endUse: 'Product for XYZ',
        type: 'API',
        selected: false
    }
]


const SendEnquiryTab = () => {

    let count = 0;

    return (
        <div className='w-full md:w-8/9 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 flex flex-col gap-5'>
            <div className='flex flex-col gap-5 lg:flex-row items-center md:items-start justify-between '>
                <div>
                    <p className='font-semibold text-sm md:text-base'>Enter the below details to send an enquiry</p>
                    <p className='font-semibold text-xs md:text-sm text-gray-400'>Fields marked '*' are mandatory</p>
                </div>
                <div className='flex flex-row justify-between items-center gap-4 w-full lg:w-fit '>
                    <button className='underline cursor-pointer hover:underline-offset-2 text-xs md:text-base '>Go back to product list</button>
                    <button className='px-2 md:px-4 py-1 bg-[#32B18A] rounded-full text-white text-sm md:text-base cursor-pointer'>Send</button>
                </div>
            </div>

            <div className=' '>
                <form className='flex flex-row flex-wrap justify-between gap-2'>
                    <input type='text' placeholder='First Name*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' />
                    <input type='text' placeholder='Last Name*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' />
                    <input type='text' placeholder='Email*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' />
                    <input type='text' placeholder='Phone Number*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' />
                    <textarea placeholder='Your message' className='my-2 w-full h-[10rem] px-4 py-2 border-2 rounded-md border-[#32B18A]' />
                    <button type='submit' className='w-full px-2 md:px-4 py-2 bg-[#32B18A] rounded-full text-white text-xs md:text-xl cursor-pointer'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default SendEnquiryTab