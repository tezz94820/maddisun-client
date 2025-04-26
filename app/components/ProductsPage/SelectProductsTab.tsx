import { ProductType } from '@/types/product';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const typeList = ["All", "Intermediates", "API", "Specialty Chemicals"];

type SelectProductsTabProps = {
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    selectedProducts: ProductType[]
    setSelectedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
}

type ProductsByCategory = {
    category: string;
    products: ProductType[];
}[];

const SelectProductsTab = ({ setActiveStep, selectedProducts, setSelectedProducts }: SelectProductsTabProps) => {
    const [productsByCategory, setProductsByCategory] = useState<ProductsByCategory>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Debounce function
    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSelectProduct = (product: ProductType) => {
        if (selectedProducts.some((selectedProduct) => selectedProduct._id === product._id)) {
            setSelectedProducts(selectedProducts.filter((selectedProduct) => selectedProduct._id !== product._id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const fetchProducts = async (type?: string, search?: string) => {
        setIsLoading(true);
        try {
            let url = "/api/products";

            // Build query parameters
            const params = new URLSearchParams();

            if (type) {
                params.append('type', type);
            }

            if (search && search.trim() !== '') {
                params.append('search', search);
            }

            // Add query parameters to URL if they exist
            if (params.toString()) {
                url = `${url}?${params.toString()}`;
            }

            const response = await axios.get(url);
            const data = response.data;
            setProductsByCategory(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Create debounced search function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((searchValue: string) => {
            fetchProducts(selectedType, searchValue);
        }, 500),
        [selectedType]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleFilterSelection = (productType: string) => {
        setSelectedType(productType);
        fetchProducts(productType, searchTerm);
    }

    useEffect(() => {
        fetchProducts(selectedType);
    }, [selectedType]);

    // Animation variants
    const tableRowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: "easeOut"
            }
        })
    };

    const skeletonPulse = {
        initial: { opacity: 0.6 },
        animate: {
            opacity: [0.6, 1, 0.6],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Loading skeleton row component
    const SkeletonRow = ({ index }: { index: number }) => (
        <motion.tr
            className='border-b border-gray-500/40'
            variants={skeletonPulse}
            initial="initial"
            animate="animate"
            custom={index}
        >
            <td className='w-2/18 md:1/18 text-center py-auto'>
                <div className='w-5 h-5 mx-auto rounded-sm bg-gray-200'></div>
            </td>
            <td className='py-4 hidden md:table-cell w-17/18 md:w-9/18'>
                <div className='h-6 bg-gray-200 rounded w-4/5'></div>
            </td>
            <td className='py-4 hidden md:table-cell w-17/18 md:w-4/18'>
                <div className='h-6 bg-gray-200 rounded w-2/3'></div>
            </td>
            <td className='py-4 hidden md:table-cell w-17/18 md:w-4/18'>
                <div className='h-6 bg-gray-200 rounded w-3/4'></div>
            </td>

            <td className='w-16/18 md:hidden flex flex-col gap-2 p-2'>
                <div className='h-5 bg-gray-200 rounded w-4/5'></div>
                <div className='h-4 bg-gray-200 rounded w-2/3'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
            </td>
        </motion.tr>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='w-full md:w-8/9 bg-white shadow-xl rounded-2xl p-6 border border-gray-200 flex flex-col gap-5'
        >
            <div className='flex flex-col gap-5 lg:flex-row items-center md:items-start justify-between'>
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className='flex flex-row items-center border-1 border-[#817e7e] rounded-lg px-2 py-1 w-full lg:w-fit'
                >
                    <Image src="/products/search-icon.svg" alt="search icon" height={20} width={20} className='h-6 w-6' />
                    <input
                        type='text'
                        className='px-4 border-none focus:outline-none w-full md:w-[20rem] text-xs md:text-base'
                        placeholder="Search for a product, CAS No, End use"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </motion.div>
                <div className='flex flex-row justify-between items-center gap-4 w-full lg:w-fit'>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className='flex flex-row items-center border border-[#817e7e] rounded-lg px-2 py-1 gap-2'
                    >
                        <p className='text-xs md:text-sm'>Type:</p>
                        <select
                            className='border-none focus:outline-none bg-transparent cursor-pointer text-xs md:text-sm'
                            value={selectedType}
                            onChange={(e) => handleFilterSelection(e.target.value)}
                        >
                            {
                                typeList.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))
                            }
                        </select>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className='px-2 md:px-4 py-1 bg-[#32B18A] rounded-full text-white text-xs md:text-base cursor-pointer'
                        onClick={() => setActiveStep(2)}
                    >
                        See Selected Products &#40;{selectedProducts.length}&#41;
                    </motion.button>
                </div>
            </div>

            <div className='w-full h-fit'>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center mb-4"
                    >
                        <motion.div
                            animate={{
                                rotate: 360,
                                transition: { duration: 1, repeat: Infinity, ease: "linear" }
                            }}
                            className="w-6 h-6 border-2 border-gray-300 border-t-[#32B18A] rounded-full"
                        />
                        <span className="ml-2 text-gray-600">Loading products...</span>
                    </motion.div>
                )}

                <table className='w-full p-2 border-separate border-spacing-y-1'>
                    <thead className='hidden md:table-header-group bg-[#DCF5EC]'>
                        <tr className='text-left'>
                            <th className='first:rounded-l-xl last:rounded-r-xl py-2 w-1/18' />
                            <th className='py-2 w-9/18'>Name</th>
                            <th className='py-2 w-4/18'>CAS No</th>
                            <th className='py-2 last:rounded-r-xl w-4/18'>Final Use</th>
                        </tr>
                    </thead>
                    <tbody className='pt-10'>
                        {isLoading ? (
                            // Skeleton loading rows
                            Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} index={index} />)
                        ) : productsByCategory.length > 0 ? (
                            productsByCategory.map((productByCategory) => (
                                <React.Fragment key={productByCategory.category}>
                                    <tr>
                                        <td className='text-white bg-[#32B18A] py-2 px-4 rounded-xl font-bold' colSpan={4}>{productByCategory.category}</td>
                                    </tr>
                                    {
                                        productByCategory.products.map((product, index) => (
                                            <motion.tr
                                                key={product._id}
                                                className='border-b border-gray-500/40'
                                                variants={tableRowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                custom={index}
                                                whileHover={{ backgroundColor: "#f9f9f9" }}
                                            >
                                                <td className='w-2/18 md:1/18 text-center py-auto'>
                                                    <motion.input
                                                        whileTap={{ scale: 1.2 }}
                                                        type='checkbox'
                                                        className='w-5 h-5 accent-[#FFA943] cursor-pointer'
                                                        onChange={() => handleSelectProduct(product)}
                                                        checked={selectedProducts.some(item => item._id === product._id)}
                                                    />
                                                </td>
                                                <td className='py-2 hidden md:table-cell w-17/18 md:w-9/18 text-sm font-semibold'>{product.name}</td>
                                                <td className='py-2 hidden md:table-cell w-17/18 md:w-4/18 text-sm'>{product.cas_no}</td>
                                                <td className='py-2 hidden md:table-cell w-17/18 md:w-4/18 text-sm'>{product.end_use}</td>

                                                <td className='w-16/18 md:hidden flex flex-col gap-1 p-2'>
                                                    <p className='text-sm font-semibold'>{product.name}</p>
                                                    <p className='text-sm text-gray-400'>{product.cas_no}</p>
                                                    <p className='text-sm text-gray-400'>{product.end_use}</p>
                                                </td>
                                            </motion.tr>
                                        ))
                                    }

                                </React.Fragment>

                            ))
                        ) : (
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td colSpan={4} className="py-4 text-center text-gray-500">No products found</td>
                            </motion.tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

export default SelectProductsTab;