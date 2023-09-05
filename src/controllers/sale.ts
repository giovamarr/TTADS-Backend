import { Request, Response } from 'express';
import Sale, {ISale, ISaleProduct } from '../models/Sale.js';
import User from '../models/User.js';

export const addSale = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    let totalPrice = 0
    const products: ISaleProduct[] = req.body.products.map((item: any) => {
      totalPrice += item.price * item.quantity;
      return {product: item.id, quantity: item.quantity, price: item.price}
    })
    const newSale= new Sale({
      products: products,
      totalPrice: totalPrice,
      user: req.body.user.id
    });
    await newSale.save();
    return res.status(201).json(newSale);
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getAllSales = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try{
    const sales = await Sale.find({ }).populate('user');
    return res.status(200).json(sales);
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getSalesByUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {  
    try{
      const sales = await Sale.find({user: req.body.user.id }).sort({ date: 'desc'}).populate({path: 'products', populate: { path: 'product' }})
                                    .populate({path: 'products', populate: { path: 'product', populate:{ path: 'category'} }})
      return res.status(200).json(sales);
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
  
  };

export const getSalesByProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id) {
          return res.status(400).json({ message: "Enviar Id de la categoria" });
        }
    
      const sales = await Sale.find({user: req.params.user });
      return res.status(200).json(sales);
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
  
  };

export const getOneSale = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id) {
        return res.status(400).json({ message: "Enviar Id de la venta" });
      }
  
      const sale = await Sale.findOne({ _id: req.params.id });
  
      if (!sale) {
        return res.status(400).json({ message: "No se la venta" });
      }
  
      return res.status(200).json(sale);
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
};

export const editSale = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id ) {
        return res.status(400).json({ message: "No se envio la venta." });
      }
      const sale = await Sale.findOne({ _id: req.params.id });
      if (!sale) {
        return res.status(404).json({ message: "No se encontro la venta" });
      }
      
      const updatedSale = await Sale.updateOne({_id : req.params.id},
                          {$set: {title: req.body.title, image: req.body.image, category: req.body.category}})
      return res.status(200).json(updatedSale);
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
};

export const deleteSale= async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{
      if (!req.params.id) {
        return res.status(400).json({ message: "Enviar Id del producto." });
      }
  
      const sale = await Sale.findOne({ _id: req.params.id });
  
      if (!sale) {
        return res.status(400).json({ message: "No se encontro la venta" });
      }
      
      const deletedSale = await Sale.deleteOne({_id : req.params.id})
      return res.status(200).json(deletedSale);
    }catch(err){
      console.log(err)
      return res.status(500).json({ message: "Ha ocurrido un error" });
    }
};