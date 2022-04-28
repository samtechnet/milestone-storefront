import express, { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import verifyAuthToken from "./Auth/verifyAuthToken";
import { User, UserTable } from "../models/user";

const userstable = new UserTable();

const index = async (req: Request, res: Response) => {
  try {
    const users = await userstable.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const newUser = await userstable.create(user);
    const token = Jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    return res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user = await userstable.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const authenticatedUser = await userstable.authenticate(
      req.body.first_name,
      req.body.password
    );
    const token = Jwt.sign(
      { user: authenticatedUser },
      process.env.TOKEN_SECRET
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};


const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken,index);
  app.get("/user/:id",verifyAuthToken, show);
  app.post("/user", create);
  app.post("/login", authenticate);
  // app.put("/books/:id", update);
  // app.delete("/books/:id", destroy);
};

export default user_routes;
