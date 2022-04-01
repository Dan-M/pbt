import * as z from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

const productSchema = z.object({
  name: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1),
  description: z.string(),
});
export type Product = z.infer<typeof productSchema>;

export const cartSchema = z.object({
  items: z.array(productSchema),
  user: userSchema,
});
export type Cart = z.infer<typeof cartSchema>;
