import { Types } from 'mongoose';

export type User = {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  emailConfirmed: boolean;
  confirmCode: string;
  teams: Types.ObjectId[]; 
};
