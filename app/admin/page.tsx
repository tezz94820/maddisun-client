import Link from "next/link";


export default function page() {
  return (
    <div>

      <section className="pt-3">
        <h1 className="text-3xl font-bold text-center text-[#FFA943]">Maddisun Admin Section</h1>
      </section>

      <section className="px-4 mt-5">
        <h3 className="text-2xl font-semibold">Products Section</h3>
        <div className="flex flex-row gap-2 mt-3">
          <Link href="/admin/products/all-products" className="hover:bg-[#FFA943] hover:text-white border-2 border-[#FFA943] rounded-lg px-4 py-2 cursor-pointer transation-all duration-300" >Get All Products</Link>
          <Link href="/admin/products/create-product" className="hover:bg-[#FFA943] hover:text-white border-2 border-[#FFA943] rounded-lg px-4 py-2 cursor-pointer transation-all duration-300">Add New Product</Link>
        </div>
      </section>

      <section className="px-4 mt-5">
        <h3 className="text-2xl font-semibold">Blogs Section</h3>
        <div className="flex flex-row gap-2 mt-3">
          <Link href="/admin/blogs/all-blogs" className="hover:bg-[#FFA943] hover:text-white border-2 border-[#FFA943] rounded-lg px-4 py-2 cursor-pointer transation-all duration-300" >Get All Blogs</Link>
          <Link href="/admin/blogs/create-blog" className="hover:bg-[#FFA943] hover:text-white border-2 border-[#FFA943] rounded-lg px-4 py-2 cursor-pointer transation-all duration-300">Add New Blog</Link>
        </div>
      </section>

      <section className="px-4 mt-5">
        <h3 className="text-2xl font-semibold">Enquires Section</h3>
        <div className="flex flex-row gap-2 mt-3">
          <Link href="/admin/enquires" className="hover:bg-[#FFA943] hover:text-white border-2 border-[#FFA943] rounded-lg px-4 py-2 cursor-pointer transation-all duration-300" >Get All Enquires</Link>
        </div>
      </section>

    </div>
  )
}
