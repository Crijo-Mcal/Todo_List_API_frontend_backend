import bcrypt from "bcrypt";
const saltRounds = 10;

export async function hash(value: string) {
    try {
        const hash = await bcrypt.hash(value, saltRounds);
        return hash;
    } catch (err: any) {
        throw err;
    }
}
