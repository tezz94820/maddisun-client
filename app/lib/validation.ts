import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  cas_no: z.string().min(1, "Product CAS No is required."),
  end_use: z.string().min(1, "Product end use is required."),
  type: z.string().min(1, "Product type is required."),
});

export const EnquirySchema = z.object({
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  email: z.string().min(1, "Email is required."),
  phone: z.string().min(1, "Phone number is required."),
  message: z.string().optional(),
  products: z.array(z.string()).optional(),
});