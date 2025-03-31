'use client';

import { useState, useEffect } from "react";
import axios from "axios";

type BlogFormType = {
  title: string;
  category: string;
  link: string;
  date: string;
}

type CategoryType = {
  _id: string;
  name: string;
}

export default function CreateBlog() {
  const initialForm = {
    title: "",
    category: "",
    link: "",
    date: new Date().toISOString().split('T')[0] // Default to today's date in YYYY-MM-DD format
  }

  const [form, setForm] = useState<BlogFormType>(initialForm);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/blogs", form);
      console.log(response.data);
      if (response.status === 201) {
        alert("Blog Created Successfully");
        setForm(initialForm);
      }
      else {
        alert("Failed to create blog");
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "An error occurred while creating the blog");
      console.error("Error creating blog:", error);
    }
  }

  return (
    <div>
      <section className="w-full">
        <h1 className="text-2xl font-bold text-center text-[#FFA943] my-5">Create Blog</h1>

        <form className="border flex flex-col w-full md:w-1/2 mx-auto py-5 px-3" onSubmit={submitHandler}>
          <label htmlFor="title" className="cursor-pointer">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={onChangeHandler}
            placeholder="Blog Title"
            className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1"
          />

          <label htmlFor="category" className="mt-5 cursor-pointer">Category</label>
          <select
            id="category"
            name="category"
            required
            value={form.category}
            onChange={onChangeHandler}
            className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1"
          >
            <option value="">Select Category</option>
            <option value={"Top Stories"}>Top Stories</option>
            <option value={"Hospitals"}>Hospitals</option>
            <option value={"Pharma"}>Pharma</option>
            <option value={"Policy"}>Policy</option>
            <option value={"Industry"}>Industry</option>
            <option value={"Education"}>Education</option>
          </select>

          <label htmlFor="link" className="mt-5 cursor-pointer">Link</label>
          <input
            id="link"
            name="link"
            type="url"
            required
            value={form.link}
            onChange={onChangeHandler}
            placeholder="https://example.com/blog-post"
            className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1"
          />

          <label htmlFor="date" className="mt-5 cursor-pointer">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={onChangeHandler}
            className="border border-gray-400 rounded-lg w-full py-1 px-2 mt-1"
          />

          <button
            type="submit"
            className="my-4 border-2 border-[#FFA943] hover:bg-[#FFA943] hover:text-white rounded-full text-xl transition-all duration-200 cursor-pointer py-1"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}