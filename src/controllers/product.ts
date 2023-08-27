import { Request, Response } from 'express';
import Product from '../models/product.js';

export const addProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.title) {
    console.log(req.body)
    return res
      .status(400)
      .json({ msg: "Enviar Titulo de categoria." });
  }

  const newProduct = new Product(req.body);
  await newProduct.save();
  return res.status(201).json(newProduct);
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const products = await Product.find({ });
  return res.status(201).json(products);

};

export const getProductsByCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id) {
        return res
          .status(400)
          .json({ msg: "Enviar Id de la categoria." });
      }
  
    const products = await Product.find({category: req.params.id });
    return res.status(201).json(products);
  
  };


export const getOneProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ msg: "Enviar Id del producto." });
    }
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: "No se encontro el producto" });
    }

    return res.status(201).json(product);
};

export const editProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id || !req.body.title) {
      return res
        .status(400)
        .json({ msg: "No se envio el producto correctamente." });
    }
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: "No se encontro el producto" });
    }

    const updatedProduct = await Product.updateOne({_id : req.params.id},
                        {$set: {title: req.body.title}})
    return res.status(200).json(updatedProduct);
};

export const deleteProduct= async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ msg: "Enviar Id del producto." });
    }
    const category = await Product.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({ msg: "No se encontro el producto" });
    }
    
    const deletedProduct = await Product.deleteOne({_id : req.params.id})
    return res.status(200).json(deletedProduct);
};