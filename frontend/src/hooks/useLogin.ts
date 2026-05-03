import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logIng from "../server/logIn";
import { useUserContext } from "../context/userContext";
import { logInSchema } from "../schemas/logIn.schema"

import type { ResponseType } from "../types/logIn.singUp.type";

export function useLogin() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();



    type ErrState = {
        email: string | undefined,
        password: string | undefined
    };


    const [error, setError] = useState<ErrState | undefined>(undefined);

    const handleError = (res: ResponseType | undefined) => {

        const email = res?.err?.typeError == "email" ? res.err.message : undefined
        const password = res?.err?.typeError == "password" ? res.err.message : undefined

        setError({ email, password });
    }

    const login = async (email: string, password: string) => {

        try {
            /* validation input */
            const validation = logInSchema.safeParse({ email, password })
            const errors = validation.error?.format();
            if (!validation.success) {
                setError({ email: errors?.email?._errors[0], password: errors?.password?._errors[0] })
                return
            }

            const res = await logIng(email, password);

            console.log(res);

            /* validation db */
            if (!res?.success) {
                handleError(res);
                return;
            }

            if (res.data?.user && res.data.AccessToken) {
                setUser({
                    AccessToken: res.data.AccessToken,
                    dataUser: {
                        id: res.data.user.id,
                        name: res.data.user.name.toUpperCase(),
                        email: res.data.user.email
                    },
                })
            }


            navigate("/dashboard");
            return;


        } catch (err: any) {
            console.error("NETWORK ERROR", err);

        }


    }

    return { login, error }
};

