import bcrypt from "bcrypt";
import client from "../database";

// let pepper: string;
// let salt: number
// const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
// if (SALT_ROUNDS && BCRYPT_PASSWORD) {
//     salt = Number (SALT_ROUNDS);
//     pepper = BCRYPT_PASSWORD
// }= process.env

const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = String(process.env.BCRYPT_PASSWORD);

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  password: string;
};
export class UserTable {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM Users";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`unable to fetch user from database ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      let loginDetails = {
        firstName: user.first_name,
        lastName: user.last_name,
        password: user.password,
      };
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name,last_name, password) VALUES ($1, $2, $3) RETURNING *";
      const hash = await bcrypt.hash(
        loginDetails.password + pepper,
        saltRounds
      );
      const result = await conn.query(sql, [
        loginDetails.firstName,
        loginDetails.lastName,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create user ${
          (user.first_name, user.last_name)
        }. Error: ${error}`
      );
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM Users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user with id ${id}. Error: ${error}`);
    }
  }
  async authenticate(
    first_name: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE first_name = $1";
      const result = await conn.query(sql, [first_name]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (await bcrypt.compare(password + pepper, user.password)) {
          return user.password;
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Cannot authenticate user ${error}`);
    }
  }
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
}
