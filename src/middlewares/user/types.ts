import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface CustomReqType extends Request {
  user?: {
    username: string;
    role: string;
  };
};

interface DecodedType {
  user: string;
  role: string
  iat: number;
  exp: number;
};

export type { CustomReqType, DecodedType };