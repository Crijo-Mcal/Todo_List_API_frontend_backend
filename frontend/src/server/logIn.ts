
const baseUrl = "http://localhost:3000";
import type { ResponseType } from "../types/logIn.singUp.type";

export default async function logIng(email: string, password: string): Promise<ResponseType | undefined> {

    try {
        const res = await fetch(`${baseUrl}/login`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const resData: ResponseType = await res.json();

        if (!res.ok) {
            return {
                success: resData.success,
                err: resData.err
            }
        }
        return {
            success: resData.success,
            data: resData.data
        };

    } catch (err: any) {
        console.error(err.message);
    }
}