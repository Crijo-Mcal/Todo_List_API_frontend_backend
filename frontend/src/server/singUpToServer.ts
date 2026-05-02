
const baseUrl = "http://localhost:3000";
import type { ResponseType } from "../types/logIn.singUp.type";

export default async function singUpToServer(name: string, email: string, password: string): Promise<ResponseType | undefined> {

    try {

        const res = await fetch(`${baseUrl}/singUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        if (!res.ok) {
            throw new Error("sing up filet")
        }

        const resdata: ResponseType = await res.json();
        return resdata;

    } catch (err: any) {
        console.log(err.message);

    }

}