import { z } from "zod";


export const logInSchema = z.object({
    email: z.string().email("required Email"),
    password: z.string().min(1, "required password").min(8, "password must be more tham 8 charanter")
})

