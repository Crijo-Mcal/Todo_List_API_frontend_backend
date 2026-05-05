import { pool } from "../connection.js"

export async function insert_RefreshToken(token: string, clienID: number): Promise<void> {
    const res = await pool.query(
        `INSERT INTO refreshtoken (token,client_id) VALUES ($1,$2)`,
        [token, clienID]
    );
}

export async function isRefreshTokenExist(clienID: number): Promise<boolean> {
    const res = await pool.query(
        "SELECT token FROM refreshtoken WHERE client_id=$1",
        [clienID]
    )
    if (res) return true
    return false
}


export async function update_RefreshToken(token: string, clienID: number) {
    const res = await pool.query(
        "UPDATE refreshtoken SET token=$1 WHERE client_id=$2",
        [token, clienID]
    )

}