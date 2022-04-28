import express, { Request, Response } from "express";
import { Book, BookTable } from "../models/book";
import verifyAuthToken from "./Auth/verifyAuthToken";

const table = new BookTable();
const index = async (req: Request, res: Response) => {
   try {
    const books = await table.index();
    res.json(books);
   } catch (error) {
       res.status(400);
       res.json(error);
   }
}

const create = async (req: Request, res: Response) => {
    try {
        const book: Book = {
            Title: req.body.Title,
            Author: req.body.Author,
            Total_pages: req.body.Total_pages,
            Book_type: req.body.Book_type,
            Summary: req.body.Summary
        }
        const newBook = await table.create(book);
        res.json(newBook);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const book = await table.show(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}
const update = async (req: Request, res: Response) => {
    try {
        const updatedbooks = await table.update(req.params.id, req.body.Title, req.body.Author);
     res.json(updatedbooks);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
 
const destroy = async (req: Request, res: Response) => {
    try {
        const deletedbook = await table.delete(req.params.id);
     res.json(deletedbook);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
 }

const book_routes = (app: express.Application) => {
    app.get("/books", verifyAuthToken,index);
    app.get("/books/:id",verifyAuthToken, show);
    app.post("/books",verifyAuthToken, create);
    app.put("/books/:id",verifyAuthToken, update);
    app.delete("/books/:id", verifyAuthToken, destroy);
}

export default book_routes;