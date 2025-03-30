import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  cas_no: z.string().min(1, "Product CAS No is required."),
  end_use: z.string().min(1, "Product end use is required."),
  type: z.string().min(1, "Product type is required."),
});
