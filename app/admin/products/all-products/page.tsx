"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  cas_no: string;
  end_use: string;
  type: string;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section className="w-full px-2">
        <h3 className="text-2xl font-bold text-center">All Products</h3>
        <motion.div
          className="w-full overflow-x-auto bg-white shadow-xl rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-400 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">CAS Number</th>
                <th className="p-3">Type</th>
                <th className="p-3">End Use</th>
                <th className="p-3">Action Buttons</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  className="border-b"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="p-3 border-b">{product.name}</td>
                  <td className="p-3 border-b">{product.cas_no}</td>
                  <td className="p-3 border-b">{product.type}</td>
                  <td className="p-3 border-b">{product.end_use}</td>
                  <td className="p-3 border-b">
                    <button className="text-white bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md">Edit</button>
                    <button className="text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>
    </div>

  );
};

export default ProductTable;
