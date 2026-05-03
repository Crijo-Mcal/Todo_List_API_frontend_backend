import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1, "Required Name"),
    email: z.string().min(1, "Required email").email("invalit email format"),
    password: z.string().min(1, "required password").min(8, "password must be more tham 8 charanter")
});

export type SignUpInput = z.infer<typeof signUpSchema>;