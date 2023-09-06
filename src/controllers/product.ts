import { Request, Response } from 'express';
import Product from '../models/product.js';

export const addProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    const product = req.body.product
    const newProduct = new Product(product);
    await newProduct.save();
    return res.status(201).json(newProduct);
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getAllProducts = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try{
    const products = await Product.find({ });
    return res.status(200).json(products);
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getProductsByCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id) {
          return res.status(400).json({ message: "Enviar Id de la categoria" });
        }
  
      const products = await Product.find({category: req.params.id });
      return res.status(201).json(products);
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
  };


export const getOneProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id) {
        return res.status(400).json({ message: "Enviar Id del producto." });
      }
  
      const product = await Product.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: "No se encontro el producto" });
      }
  
      return res.status(200).json(product);

    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
};

export const editProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    if (!req.params.id) {
      return res.status(400).json({ message: "Enviar Id del producto." });
    }

    const productEdit = req.body.product
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "No se encontro el producto" });
    }

    const updatedProduct = await Product.updateOne({_id : req.params.id},
                        {$set: {title: productEdit.title, image: productEdit.image, category: productEdit.category, price: productEdit.price, description: productEdit.description}})
    return res.status(200).json(updatedProduct);
};

export const deleteProduct= async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id) {
        return res.status(400).json({ message: "Enviar Id del producto." });
      }
  
      const category = await Product.findOne({ _id: req.params.id });
      if (!category) {
        return res.status(400).json({ message: "No se encontro el producto" });
      }
      
      const deletedProduct = await Product.deleteOne({_id : req.params.id})
      return res.status(200).json({ message: "Borrado correctamente" });
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
};