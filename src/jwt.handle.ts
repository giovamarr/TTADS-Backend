import jwt from 'jsonwebtoken';
import { IUser } from './models/User.js';

export const createToken = (user: IUser) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, `${process.env.JWT_SECRET}`, {
      expiresIn: 100000
    });
  }

export const validateToken = (jwtT: string): IUser =>{
    const user = jwt.verify(jwtT, `${process.env.JWT_SECRET}` ) as IUser
    return user
}