export type GenWorker = {
  id: string;
  name: string;
  ownerId: string;
  isActive: boolean;
  path: string;
  projects: [string];
};
