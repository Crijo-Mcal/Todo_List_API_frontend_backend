
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
        console.log(err.message);

    }

}