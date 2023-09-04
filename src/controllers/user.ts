import { Request, Response } from 'express';
import User from '../models/User.js';

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await User.find({ });
  return res.status(200).json(users);
};