'use client';

import { useState } from "react";
import axios from "axios";

type FormType = {
  name: string;
  cas_no: string;
  end_use: string;
  type: string;
}

export default function createProduct() {
  const initialForm = {
    name: "",
    cas_no: "",
    end_use: "",
    type: ""
  }
  const [form, setForm] = useState<FormType>(initialForm);

  const onChangeHandler = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/products", form);
      console.log(response.data);
      if (response.status === 201) {
        alert("Product Created Successfully");
        setForm(initialForm);
      }
      else {
        alert("Failed to create product");
      }
    } catch (error: any) {

    }
  }

  return (
    <div>
      <section className=" w-full">
        <h1 className="text-2xl font-bold text-center text-[#FFA943] my-5">Create Product</h1>
        <form className="border flex flex-col w-full md:w-1/2 mx-auto py-5 px-3" onSubmit={submitHandler}>

          <label htmlFor="name" className="cursor-pointer">Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={onChangeHandler} placeholder="Product Name" className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1" />

          <label htmlFor="CAS" className="mt-5 cursor-pointer">CAS No</label>
          <input id="CAS" name="cas_no" type="text" required value={form.cas_no} onChange={onChangeHandler} placeholder="Product CAS No" className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1" />

          <label htmlFor="endUse" className="mt-5 cursor-pointer">End Use</label>
          <input id="endUse" name="end_use" type="text" required value={form.end_use} onChange={onChangeHandler} placeholder="Product End Use" className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1" />

          <label htmlFor="type" className="mt-5 cursor-pointer">Type</label>
          <select id="type" name="type" required value={form.type} onChange={onChangeHandler} className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1">
            <option value="">Select Type</option>
            <option value="Intermediates">Intermediates</option>
            <option value="API">API</option>
            <option value="Unknown">Unknown</option>
          </select>

          <button type="submit" className="my-4 border-2 border-[#FFA943] hover:bg-[#FFA943] hover:text-white rounded-full text-xl transition-all duration-200 cursor-pointer ">Submit</button>
        </form>
      </section>
    </div>
  )
}