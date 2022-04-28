import { Connection } from "pg";
import client from "../database";
import express from "express";

export type Book = {
  Title: String;
  Author: String;
  Total_pages: Number;
  Book_type: String;
  Summary: String;
};
export class BookTable {
  async index(): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM bookTables";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`could not fetch data from the db ${error}`);
    }
  }

  async create(book: Book) {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO bookTables(Title, Author, Total_pages, Book_type, Summary) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [
        book.Title,
        book.Author,
        book.Total_pages,
        book.Book_type,
        book.Summary,
      ];
      const res = await client.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `could not add new book ${
          (book.Title,
          book.Author,
          book.Total_pages,
          book.Book_type,
          book.Summary)
        }. Error: ${error}`
      );
    }
  }
  async show(id: string): Promise<Book> {
    try {
      const sql = "SELECT * FROM bookTables WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find book ${id}. Error: ${error}`);
    }
  }
  async delete(id: string): Promise<Book> {
    try {
      const sql = "DELETE FROM bookTables WHERE id= ($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const book = result.rows[0];
      conn.release();
      return book;
    } catch (error) {
      throw new Error(`Could not delete book ${id}. Error: ${error}`);
    }
  }
  async update(id: string, Title: string, Author: string): Promise<Book> {
    try {
      const sql =
        "UPDATE bookTables SET  Title= ($1), Author = ($2) WHERE id =($3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [Title, Author, id]);
      const book = result.rows[0];
      conn.release();
      return book;
    } catch (error) {
      throw new Error(`could not update book of id${id}, Error${error}`);
    }
  }
}
