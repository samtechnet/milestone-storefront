import express, { Request, Response } from "express";
import { Product, productTable } from "../models/products";

const productsTable = new productTable();
const index = async (req: Request, res: Response) => {
   try {
    const product = await productsTable.index();
    res.json(product);
   } catch (error) {
       res.status(400);
       res.json(error);
   }
}

const create = async (req: Request, res: Response) => {
    try {
        const products: Product = {
            name: req.body.name,
            price: req.body.price,
        }
        const newproduct = await productsTable.create(products);
        res.json(newproduct);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await productsTable.show(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}
const category = async (req: Request, res: Response) => {
    try {
        const cat = req.query.cat as string
        const result = await productsTable.category(cat);
     res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
 
const destroy = async (req: Request, res: Response) => {
    try {
        const deletedproduct = await productsTable.delete(req.params.id);
     res.json(deletedproduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
 }

const product_routes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.get("/produst", category);
    app.delete("/books/:id", destroy);
}

export default product_routes;