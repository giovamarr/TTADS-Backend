import { NextFunction, Request, Response } from "express";

const validateAdmin = (req: Request, res: Response, next: NextFunction) =>{
    try{
        if (req.body.user.role != 'admin'){
            res.status(403).send({ message: "Acceso Denegado." });
        }
        next()
    } catch (e) {
        res.status(400).send({ message: "Acceso Denegado." });
    }

}

export { validateAdmin};