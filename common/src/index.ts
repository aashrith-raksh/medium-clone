import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});
export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const newBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  postId: z.string(),
});



export type SignUpType = z.infer<typeof signUpInput>;
export type SignInType = z.infer<typeof signInInput>;

export type NewBlogType = z.infer<typeof newBlogInput>;

export type UpdateBlogType = z.infer<typeof updateBlogInput>;
