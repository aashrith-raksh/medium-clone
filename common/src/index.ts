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

export type SignUpType = z.infer<typeof signUpInput>;
export type SignInType = z.infer<typeof signInInput>;;

export const newBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type NewBlogType = z.infer<typeof newBlogInput>;

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  postId: z.string(),
});

export type UpdateBlogType = z.infer<typeof updateBlogInput>;
