import { Types } from 'mongoose';

export type Team = {
  _id: Types.ObjectId;
  name: string;
  owner: Types.ObjectId;         
  members: Types.ObjectId[];       
  projects: Types.ObjectId[];     

  master_genworker: string | null;
  storage_genworkers: string[] | null;
  genworkers: Types.ObjectId[] | null;
};
