import z from "zod";
export declare const signUpInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const newBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    postId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    postId: string;
}, {
    title: string;
    content: string;
    postId: string;
}>;
export type SignUpType = z.infer<typeof signUpInput>;
export type SignInType = z.infer<typeof signInInput>;
export type NewBlogType = z.infer<typeof newBlogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;
