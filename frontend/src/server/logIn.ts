
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

        if (!res.ok) {
            throw new Error("login filet")
        }

        const data: ResponseType = await res.json();

        return data;
    } catch (err: any) {
        console.error(err.message);
    }

}