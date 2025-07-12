export type Project = {
  _id: string;
  name: string;
  description: string;
  owner: string;
  teamId: string;
  flows: [Flow];
};

export type Flow = {
  name: string;
  description: string;
  flowData: string;
  type: string;
};