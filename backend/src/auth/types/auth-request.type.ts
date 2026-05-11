//backend\src\auth\types\auth-request.type.ts
import { Request } from 'express';

export type AuthRequest = Request & {
  user: {
    id: string;
    email: string;
    type?: string;
  };
};
