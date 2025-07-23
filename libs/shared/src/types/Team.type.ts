import { Types } from 'mongoose';

export type Team = {
  _id: Types.ObjectId;
  name: string;
  owner: Types.ObjectId;         
  members: Types.ObjectId[];       
  projects: Types.ObjectId[];      
};
