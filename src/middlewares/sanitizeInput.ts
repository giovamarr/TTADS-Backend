import { NextFunction, Request, Response } from "express";

const sanitizeCategoryInput = (req: Request, res: Response, next: NextFunction) =>{
    const MAX_CATEGORY_TITLE = 50
    const MIN_CATEGORY_TITLE = 3
    if (!req.body.title || req.body.title.length < MIN_CATEGORY_TITLE || req.body.title.length > MAX_CATEGORY_TITLE) {
        return res.status(400).json({ message: "Titulo invalido" });
      }
    req.body.category = {
        title: req.body.title,
        image: req.body.image,
    }
    next()
}


const sanitizeProductInput = (req: Request, res: Response, next: NextFunction) =>{
    const MAX_PRODUCT_TITLE = 50
    const MIN_PRODUCT_TITLE = 3
    const MAX_DESCRIPTION = 200
    if (!req.body.title || req.body.title.length < MIN_PRODUCT_TITLE || req.body.title.length > MAX_PRODUCT_TITLE) {
        return res.status(400).json({ message: "Titulo invalido" });
      }
    if (req.body.description.length > MAX_DESCRIPTION){
        return res.status(400).json({ message: "Descripcion muy larga" });
    }

    req.body.product = {
        title: req.body.title,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
    }
    next()
}

const sanitizeUserInput = (req: Request, res: Response, next: NextFunction) =>{
    const MAX_USER_EMAIL = 50
    const MIN_USER_EMAIL = 2
    const MAX_USER_NAME = 50
    const MIN_USER_NAME = 3

    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({ message: "Datos incompletos" });
      }
      if(req.body.name.length <= MIN_USER_NAME || req.body.name.length >= MAX_USER_NAME){
        return res.status(400).json({ message: `El nombre debe contener entre ${MIN_USER_EMAIL} y ${MAX_USER_EMAIL} caracteres` });
      }

      if(req.body.email.length <= MIN_USER_EMAIL || req.body.email.length >= MAX_USER_EMAIL){
        return res.status(400).json({ message: `El email debe contener entre ${MIN_USER_EMAIL} y ${MAX_USER_EMAIL} caracteres` });
      }

    req.body.user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    }
    next()
}

export { sanitizeCategoryInput, sanitizeProductInput, sanitizeUserInput};