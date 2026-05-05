import { pool } from "./connection.js";

export async function addTask(id: number, task: string) {
    const data = await pool.query('INSERT INTO task (description, status, client_id),VALUE($1,todo,$3) RETURNING*',
        [task, id]
    )
    return data;
}

export async function selectAllTask(id: number,): Promise<object[]> {
    const res = await pool.query('SELECT * FROM task WHERE client_id=$1', [id])
    const data = res.rows
    return data;
}



