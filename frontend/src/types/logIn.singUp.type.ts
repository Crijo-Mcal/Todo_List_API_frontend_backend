export interface User {
    id: number,
    name: string,
    email: string
}

export interface Data {
    AccessToken?: string,
    user?: User
}

export interface ErrInfo {
    typeError?: "email" | "password",
    message?: string
}

export interface ResponseType {
    success?: boolean,
    err?: ErrInfo,
    data?: Data
}


