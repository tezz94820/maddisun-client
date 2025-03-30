'use client';

import { useModal } from '@/app/context/ModalContext';
import { ProductType, SendEnquiryFormdataType } from '@/types/product';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SendEnquiryModal from './SendEnquiryModal';
import axios from 'axios';

type SendEnquiryTabProps = {
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    selectedProducts: ProductType[]
    formdata: SendEnquiryFormdataType
    setFormdata: React.Dispatch<React.SetStateAction<SendEnquiryFormdataType>>
    clearStoredData: () => void
}


const SendEnquiryTab = ({ setActiveStep, selectedProducts, formdata, setFormdata, clearStoredData }: SendEnquiryTabProps) => {

    const { openModal, closeModal } = useModal();

    const setFormDataOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/enquiry', {...formdata, products: selectedProducts.map((product) => product._id)});
            if (response.status === 200) {
                openModal(<SendEnquiryModal closeModal={closeModal} clearStoredData={clearStoredData} />);
            }
            else {
                alert("Failed to send enquiry. Please try again.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const message = `Hi,\nI am looking to enquire about the following products :- \n${selectedProducts.map((product, index) => {
            return `\n${index + 1}.\tName: ${product.name}\nCAS No: (${product.cas_no})\nQty: (Please enter kg/gm/ton)\n`
        }).join('')
            }\nRegards,\n${formdata.first_name} ${formdata.last_name}`;
        setFormdata({ ...formdata, message });
    }, [formdata.first_name, formdata.last_name])

    return (
        <div className='w-full md:w-8/9 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 flex flex-col gap-5'>
            <div className='flex flex-col gap-5 lg:flex-row items-center md:items-start justify-between '>
                <div>
                    <p className='font-semibold text-sm md:text-base'>Enter the below details to send an enquiry</p>
                    <p className='font-semibold text-xs md:text-sm text-gray-400'>Fields marked '*' are mandatory</p>
                </div>
                <div className='flex flex-row justify-between items-center gap-4 w-full lg:w-fit '>
                    <button className='underline cursor-pointer hover:underline-offset-2 text-xs md:text-base ' onClick={() => setActiveStep(2)}>Go back to product list</button>
                    <button type="submit" className='px-2 md:px-4 py-1 bg-[#32B18A] rounded-full text-white text-sm md:text-base cursor-pointer' form='enquiry-form'>Send</button>
                </div>
            </div>

            <div className=' '>
                <form id='enquiry-form' className='flex flex-row flex-wrap justify-between gap-2' onSubmit={handleFormSubmit}>
                    <input type='text' placeholder='First Name*' name="first_name" className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required value={formdata.first_name} onChange={setFormDataOnChangeHandler} />
                    <input type='text' placeholder='Last Name*' name="last_name" className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required value={formdata.last_name} onChange={setFormDataOnChangeHandler} />
                    <input type='text' placeholder='Email*' name="email" className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required value={formdata.email} onChange={setFormDataOnChangeHandler} />
                    <input type='text' placeholder='Phone Number*' name="phone" className='w-full md:w-[47%] my-2 px-4 py-2 border-2 rounded-md border-[#32B18A]' required value={formdata.phone} onChange={setFormDataOnChangeHandler} />
                    <textarea placeholder='Your message' name="message" className='my-2 w-full h-[10rem] px-4 py-2 border-2 rounded-md border-[#32B18A]' required value={formdata.message} onChange={setFormDataOnChangeHandler} />
                    <button type='submit' className='w-full px-2 md:px-4 py-2 bg-[#32B18A] rounded-full text-white text-xs md:text-xl cursor-pointer'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default SendEnquiryTab