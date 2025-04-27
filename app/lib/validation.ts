import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  cas_no: z.string().min(1, "Product CAS No is required."),
  end_use: z.string().min(1, "Product end use is required."),
  type: z.string().min(1, "Product type is required."),
  category: z.string().min(1, "Product category is required."),
});

export const EnquirySchema = z.object({
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  email: z.string().min(1, "Email is required."),
  phone: z.string().min(1, "Phone number is required."),
  message: z.string().optional(),
  products: z.array(z.string()).optional(),
});

export const BlogSchema = z.object({
  title: z.string().min(1, "Blog title is required."),
  category: z.string().min(1, "Blog category is required."),
  link: z.string().url("Valid URL is required.").min(1, "Blog link is required."),
  date: z.coerce.date({
    required_error: "Date is required.",
    invalid_type_error: "Date must be a valid date format."
  })
});


export const BlogUpdateSchema = z.object({
  _id: z.string().min(1, "Blog ID is required"),
  title: z.string().min(1, "Blog title is required").optional(),
  category: z.string().min(1, "Blog category is required").optional(),
  link: z.string().url("Must be a valid URL").min(1, "Blog link is required").optional(),
  pinned: z.boolean().optional(),
  date: z.string().or(z.date()).optional(),
});