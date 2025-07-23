import { Types } from 'mongoose';

export type Flow = {
  name: string;
  description: string;
  flowData: string;
  type: string;
};

export type Project = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  owner: Types.ObjectId; 
  flows: Flow[];
};
