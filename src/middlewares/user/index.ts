import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createDefaultResponse } from '../../utils';
import { CustomReqType, DecodedType } from './types';
import UserRepository from '../../repositories/user';
import User from '../../models/entity/user';

export default class UserMiddleware {
  static verifyToken = async (req: CustomReqType, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string | undefined = req.headers.authorization;

      if (!token) {
        throw new Error('please login first!');
      };

      if (!token.startsWith('Bearer')) {
        throw new Error('wrong format token!')
      };

      const getToken: string = token.split(' ')[1];
      const decoded = jwt.verify(getToken, `${process.env.SECRET_KEY}`) as DecodedType;

      const user = await UserRepository.getUserByUsername(decoded.user) as User;

      const isUser: boolean = user.username === decoded.user;

      if (!isUser) {
        throw new Error('user not found!');
      } 

      next();
    } catch (e) {
      if (e instanceof Error) {
        const response = createDefaultResponse(401, 'fail', e.message);
        res.status(401).json(response);
      }
    }
  }
}