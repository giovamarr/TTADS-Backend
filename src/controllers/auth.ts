import { Request, Response } from 'express';
import User from '../models/User.js';
import { createToken } from '../jwt.handle.js';

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    const user = req.body.user
    const existUser = await User.findOne({ email: user.email });
    if (existUser) {
      return res.status(400).json({ message: "Email ya esta registrado." });
    }
  
    const newUser = new User(user);
    await newUser.save();
    return res.status(201).json(newUser);
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "No se enviaron el email o password" });
    }
  
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(200).json({ token: createToken(user) });
    }
    
    return res.status(400).json({ message: "El email o password incorrectos"});
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

export const getRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    return res.status(200).json({ role: req.body.user.role });
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};