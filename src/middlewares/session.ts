import { NextFunction, Request, Response } from "express";
import { validateToken } from "../jwt.handle.js";

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    try{
        const jwt = req.headers.authorization || '';
        const token = jwt.split(' ').pop();
        if (!token) return res.status(401).json({ message: "Token Invalido." });
        const user = validateToken(`${token}`);
        if (!user){
            res.status(401).json({ message: "Token Invalido." });
        }
        req.body.user = user;
        next();
    } catch (e) {
        res.status(400).send({ message: "Token Invalido." });
    }
}


export {validateJwt};