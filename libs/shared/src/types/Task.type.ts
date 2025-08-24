import { Types } from 'mongoose';

export type Task = {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  flowName: string;
  path: string;         
  data: any;       
  isProcessingBy: Types.ObjectId;      
};
