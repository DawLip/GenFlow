import { Types } from 'mongoose';

export type Node = {
  id: string,
  type: string,
  package: string,
  path: string,
  position: {
    x: number,
    y: number
  },
  style?: any,
  data?: any,
}

export type Edge = {
  id: string,
  source: string,
  surceHandle: string,
  target: string,
  targetHandle: string
}

export type Flow = {
  name: string;
  path: string;
  description: string;
  type: string;
  nodes: Node[];
};

export type Project = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  owner: Types.ObjectId; 
  flows: Flow[];
  genworkers: Types.ObjectId[];
};
