import { Request, Response } from 'express';
import User from '../models/user.js';

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try{
    const users = await User.find({ });
    return res.status(200).json(users);
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};