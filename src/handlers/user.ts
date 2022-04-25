import express, { Request, Response } from "express";
import { User, UserTable } from "../models/user";

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        }
        const newUser = await UserTable.create(user);
        res.json(newUser);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const user_routes = (app: express.Application) => {
    // app.get("/books", index);
    // app.get("/books/:id", show);
    app.post("/books", create);
    // app.put("/books/:id", update);
    // app.delete("/books/:id", destroy);
}

export default user_routes;