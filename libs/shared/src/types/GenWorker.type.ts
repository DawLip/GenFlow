export type GenWorker = {
  id: string;
  name: string;
  ownerId: string;
  isActive: boolean;
  path: string;
  assignedFlows: [string];
  assignedProjects: [string];
  assignedTeams: [string];
};
