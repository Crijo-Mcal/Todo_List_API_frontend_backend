import { useState } from "react";
import { signUpSchema } from "../schemas/signUp.schema"
import singUpToServer from "../server/singUpToServer"
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

interface ErrState {
    name: string | undefined,
    email: string | undefined,
    password: string | undefined
}


export function useSingUp() {
    const [err, setErr] = useState<ErrState | null>(null)
    const { setUser } = useUserContext();
    const navigate = useNavigate()


    const resister = async (name: string, email: string, password: string) => {


        /* validation input */
        const validation = signUpSchema.safeParse({ name, email, password });
        if (!validation.success) {
            const erros = validation.error.format()
            setErr({
                name: erros.name?._errors[0],
                email: erros.email?._errors[0],
                password: erros.password?._errors[0]
            })
            return
        }


        /* vadilation data base */
        const res = await singUpToServer(name, email, password);

        if (res?.err?.typeError == "email") {
            setErr({
                name: undefined,
                email: res.err.message,
                password: undefined
            })
            return;
        }

        if (res?.data?.user && res.data.AccessToken) {
            setUser({
                AccessToken: res.data.AccessToken,
                dataUser: {
                    id: res.data.user.id,
                    name: res.data.user.name.toUpperCase(),
                    email: res.data.user.email
                },
            })
        }

        navigate("/dashboard")
        return


    }

    return { err, resister }
}