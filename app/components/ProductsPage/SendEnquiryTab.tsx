'use client';

import { useModal } from '@/app/context/ModalContext';
import Image from 'next/image'
import Link from 'next/link';
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
    const { openModal, closeModal } = useModal();


    return (
        <div className='w-full md:w-8/9 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 flex flex-col gap-5'>
            <div className='flex flex-col gap-5 lg:flex-row items-center md:items-start justify-between '>
                <div>
                    <p className='font-semibold text-sm md:text-base'>Enter the below details to send an enquiry</p>
                    <p className='font-semibold text-xs md:text-sm text-gray-400'>Fields marked '*' are mandatory</p>
                </div>
                <div className='flex flex-row justify-between items-center gap-4 w-full lg:w-fit '>
                    <button className='underline cursor-pointer hover:underline-offset-2 text-xs md:text-base '>Go back to product list</button>
                    <button className='px-2 md:px-4 py-1 bg-[#32B18A] rounded-full text-white text-sm md:text-base cursor-pointer' form='enquiry-form'>Send</button>
                </div>
            </div>

            <div className=' '>
                <form id='enquiry-form' className='flex flex-row flex-wrap justify-between gap-2'>
                    <input type='text' placeholder='First Name*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required />
                    <input type='text' placeholder='Last Name*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required />
                    <input type='text' placeholder='Email*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required />
                    <input type='text' placeholder='Phone Number*' className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required />
                    <textarea placeholder='Your message' className='my-2 w-full h-[10rem] px-4 py-2 border-2 rounded-md border-[#32B18A]' required />
                    <button type='submit' className='w-full px-2 md:px-4 py-2 bg-[#32B18A] rounded-full text-white text-xs md:text-xl cursor-pointer'
                        onClick={() =>
                            openModal(
                                <div className="bg-white py-6 px-3 md:p-6 mx-3 md:mx-0 rounded-3xl shadow-2xl max-w-lg w-full md:w-[25rem] relative flex flex-col gap-4 items-center">
                                    <Link href="/" className="flex flex-row gap-2 cursor-pointer">
                                        <Image className="h-12 w-12 lg:h-15 lg:w-15" src="/logo.svg" alt="Maddisun Logo" width={50} height={50} />
                                        <div className="leading-none tracking-normal text-[#32B18A] space-y-0" >
                                            <h4 className="font-bold text-lg lg:text-2xl">Maddisun</h4>
                                            <h5 className="font-semibold text-xs lg:text-base mt-[-2px]">Ventures LLP</h5>
                                        </div>
                                    </Link>
                                    <Image src="/modal/check-mark.png" alt="check-mark" width={50} height={50} className="h-[6rem] w-[6rem]" />
                                    <p className='font-semibold text-lg text-center'>Your enquiry has been sent successfully</p>
                                    <p className=' text-sm text-center'>Thanks for reaching out, we look forward to our relationship and will get back to you shortly!</p>
                                    <Link className='flex flex-row items-center justify-center border-2 border-[#49AD8F] rounded-full w-full cursor-pointer'
                                        href="https://wa.me/919870563634?text=I'm%20interested%20in%20Maddisun%20Healthcare" target="_blank" rel="noopener noreferrer"
                                        onClick={() => closeModal()}
                                    >
                                        <Image src="/homepage/watsapp-logo.svg" className="h-[3rem] w-[3rem]" alt="watsapp-logo" height={100} width={100} />
                                        <p className='text-[#49AD8F] font-semibold'>Connect on Whatsapp</p>
                                    </Link>
                                    <Link className='flex flex-row items-center justify-center border-2 border-[#F69220] rounded-full w-full cursor-pointer py-3'
                                        href="/products" onClick={() => closeModal()}
                                    >
                                        <p className='text-[#F69220] font-semibold'>See products list</p>
                                    </Link>
                                </div>
                            )
                        }
                    >Send</button>
                </form>
            </div>
        </div>
    )
}

export default SendEnquiryTab