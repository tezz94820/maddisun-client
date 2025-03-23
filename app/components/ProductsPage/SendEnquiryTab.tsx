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
                <p className='font-semibold text-base'>Deselect any that you want to remove</p>
                <div className='flex flex-row justify-between items-center gap-4 w-full lg:w-fit '>
                    <button className='underline cursor-pointer hover:underline-offset-2'>Go back to product selection</button>
                    <button className='px-2 md:px-4 py-1 bg-[#32B18A] rounded-full text-white text-xs md:text-base cursor-pointer'>Send Enquiry</button>
                </div>
            </div>

            <div className='w-full h-fit'>
                <table className='w-full p-2 border-collapse'>
                    <thead className='hidden md:table-header-group bg-[#DCF5EC]'>
                        <tr className='text-left'>
                            <th className='first:rounded-l-xl last:rounded-r-xl py-2 w-1/18 ' />
                            <th className='py-2 w-9/18'>Name</th>
                            <th className='py-2 w-4/18'>CAS No</th>
                            <th className='py-2 last:rounded-r-xl w-4/18'>Final Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productsList.map(product => (
                                <tr key={product.id} className='border-b border-gray-500/40 '>
                                    <td className='w-2/18 md:1/18 text-center py-auto'>
                                        <input type='checkbox' className='w-5 h-5 accent-[#FFA943] cursor-pointer' />
                                    </td>
                                    <td className='py-2 hidden md:table-cell w-17/18 md:w-9/18 text-sm font-semibold'>{product.name}</td>
                                    <td className='py-2 hidden md:table-cell w-17/18 md:w-4/18 text-sm'>{product.casNo}</td>
                                    <td className='py-2 hidden md:table-cell w-17/18 md:w-4/18 text-sm'>{product.endUse}</td>

                                    <td className='w-16/18 md:hidden flex flex-col gap-1 p-2'>
                                        <p className='text-sm font-semibold'>{product.name}</p>
                                        <p className='text-sm text-gray-400'>{product.casNo}</p>
                                        <p className='text-sm text-gray-400'>{product.endUse}</p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SendEnquiryTab