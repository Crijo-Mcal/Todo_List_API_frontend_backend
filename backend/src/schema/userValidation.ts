import { z } from "zod";


export const singUpValidationSchema = z.object({
    name: z.string().min(4, "name must be more tham 4 charanter"),
    email: z.string().email("required Email"),
    password: z.string().min(1, "required password").min(8, "password must be more tham 8 charanter")
})


export const logInValidationSchema = z.object({
    email: z.string().email("required Email"),
    password: z.string().min(1, "required password").min(8, "password must be more tham 8 charanter")
})