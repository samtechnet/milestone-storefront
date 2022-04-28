import Jwt  from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        const decoded = Jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch ( error) {
        res.status(401)
        res.json({error})
    }

}

export default verifyAuthToken