import bcrypt from "bcrypt"
import client from "../database";

let pepper: string;
let salt: number
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
if (SALT_ROUNDS && BCRYPT_PASSWORD) {
    salt = Number (SALT_ROUNDS);
    pepper = BCRYPT_PASSWORD
}


export type User = {
    id?: string
    first_name: string
    last_name: string
    password: string
}
export class UserTable {
    
    // async index(): Promise<User[]> {
    //     try {
    //         const conn = await client.connect();
    //         const sql = "SELECT * FROM Users";
    //         const res = await conn.query(sql);
    //         conn.release();
    //         return res.rows;
    //     } catch (error) {
    //         throw new Error(`unable to fetch products from database ${error}`)
    //     }
        
    // }

    async create(user : User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO UserTables(first_name,last_name, password_digest) VALUES ($1, $2, $3) RETURNING *`;
            const hash = await bcrypt.hash(user.password + pepper, salt );
            const result = await conn.query(sql, [user.first_name, user.last_name,hash]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`unable to create user ${user.first_name, user.last_name}. Error: ${error}`)
        }
        
    };
    // async show(id: string): Promise<User> {
    //     try {
    //         const sql = 'SELECT * FROM productTables WHERE id=($1)';
    //         const conn = await client.connect();
    //         const result = await conn.query(sql, [id]);
    //         conn.release();
    //         return result.rows[0];
    //     } catch (error) {
    //         throw new Error(`Could not find product with id ${id}. Error: ${error}`);
    //     }
    // }
    // async delete(id: string): Promise<User>{
    //     try {
    //         const sql = 'DELETE FROM productTables WHERE id= ($1) RETURNING *';
    //         const conn = await client.connect();
    //         const result = await conn.query(sql, [id]);
    //         conn.release()
    //         return result.rows[0];
          
    //     } catch (error) {
    //         throw new Error(`Could not delete product with id  ${id}. Error: ${error}`)
    //     }
    // }
    // async category(cat: string): Promise<User>{
    //     try {
    //         const sql = `SELECT * FROM products WHERE category = '${ cat }'`;
    //         const conn = await client.connect();
    //         const result = await conn.query(sql,);
    //         conn.release();
    //         return result.rows[0];

    //     } catch (error) {
    //         throw new Error(`${cat} does not exist: Error${error}`)
    //     }
    // }
};