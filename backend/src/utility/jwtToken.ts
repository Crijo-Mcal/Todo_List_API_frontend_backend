import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
dotenv.config();

const secretKey = process.env.TOKEN_SECRET_KEY as string;

export function createAccessToken(id: number, email: string): string {
    if (!secretKey) {
        throw new Error("TOKEN_SECRET_KEY is not defined in .env");
    }
    const token = jwt.sign(
        { id, email },
        secretKey,
        { expiresIn: "15m" }
    );
    return token;
}

export function createRefreshToken(): string {

    const refreshToken = randomBytes(64).toString("hex");

    return refreshToken;
}

export function checkAccessToken(accessToken: string) {
    const result = jwt.verify(accessToken, secretKey)
    if (result) return true
    return false
}