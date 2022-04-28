import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: number;
};
export class productTable {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`unable to fetch products from database ${error}`);
    }
  }

  async create(product: Product) {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *";
      const values = [product.name, product.price];
      const res = await client.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `could not create product ${
          (product.name, product.price)
        }. Error: ${error}`
      );
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product with id ${id}. Error: ${error}`);
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id= ($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not delete product with id  ${id}. Error: ${error}`
      );
    }
  }
  async category(cat: string): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE category = '${cat}'`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${cat} does not exist: Error${error}`);
    }
  }
}
