import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type sendEnquiryModalProps = {
    closeModal: () => void
    clearStoredData: () => void
}

const SendEnquiryModal = ({ closeModal, clearStoredData }: sendEnquiryModalProps) => {

    const handleCloseModal = () => {
        clearStoredData();
        closeModal();
        if (typeof window !== 'undefined') {
            window.location.reload();        
        }
    }
    return (
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
                onClick={() => handleCloseModal}
            >
                <Image src="/homepage/watsapp-logo.svg" className="h-[3rem] w-[3rem]" alt="watsapp-logo" height={100} width={100} />
                <p className='text-[#49AD8F] font-semibold'>Connect on Whatsapp</p>
            </Link>
            <button className='flex flex-row items-center justify-center border-2 border-[#F69220] rounded-full w-full cursor-pointer py-3'
                onClick={() => handleCloseModal()}
            >
                <p className='text-[#F69220] font-semibold'>See products list</p>
            </button>
        </div>
    )
}

export default SendEnquiryModal