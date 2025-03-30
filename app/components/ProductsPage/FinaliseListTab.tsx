import { ProductType } from '@/types/product';
import React from 'react'

type SelectProductsTabProps = {
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    selectedProducts: ProductType[]
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
}


const FinaliseListTab = ({ setActiveStep, selectedProducts, setSelectedProducts }: SelectProductsTabProps) => {

    const isProductSelected = (_id: string) => {
        return selectedProducts.some(product => product._id === _id);
    }

    const handleDeselectProduct = (product: ProductType) => {
        if (selectedProducts.some((selectedProduct) => selectedProduct._id === product._id)) {
            setSelectedProducts(selectedProducts.filter((selectedProduct) => selectedProduct._id !== product._id));
        }
    };

    return (
        <div className='w-full md:w-8/9 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 flex flex-col gap-5'>
            <div className='flex flex-col gap-5 lg:flex-row items-start justify-between '>
                <p className='font-semibold text-base'>Deselect any that you want to remove</p>
                <div className='flex flex-row justify-between gap-4 w-full lg:w-fit '>
                    <button className='underline cursor-pointer hover:underline-offset-2 text-xs md:text-base' onClick={() => setActiveStep(1)}>Go back to product selection</button>
                    <button className='px-2 md:px-4 py-1 bg-[#32B18A] rounded-full text-white text-xs md:text-base cursor-pointer'
                        onClick={() => setActiveStep(3)}>Send Enquiry</button>
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
                            selectedProducts.map(product => (
                                <tr key={product._id} className='border-b border-gray-500/40 '>
                                    <td className='w-2/18 md:1/18 text-center py-auto'>
                                        <input type='checkbox' className='w-5 h-5 accent-[#FFA943] cursor-pointer' checked={isProductSelected(product._id)} onChange={() => handleDeselectProduct(product)}/>
                                    </td>
                                    <td className='py-2 hidden md:table-cell w-17/18 md:w-9/18 text-sm font-semibold'>{product.name}</td>
                                    <td className='py-2 hidden md:table-cell w-17/18 md:w-4/18 text-sm'>{product.cas_no}</td>
                                    <td className='py-2 hidden md:table-cell w-17/18 md:w-4/18 text-sm'>{product.end_use}</td>

                                    <td className='w-16/18 md:hidden flex flex-col gap-1 p-2'>
                                        <p className='text-sm font-semibold'>{product.name}</p>
                                        <p className='text-sm text-gray-400'>{product.cas_no}</p>
                                        <p className='text-sm text-gray-400'>{product.end_use}</p>
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

export default FinaliseListTab