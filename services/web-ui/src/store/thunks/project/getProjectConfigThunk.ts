

export const getProjectConfigThunk = (webRTC, projectName: string, storageGenworkerId: string) => async (dispatch: any, getState: any) => {
  const state = getState();
  const master_genworkerId = state.team.masterGenworker;
  const master_genworker = state.genworkersRepo.genworkers[master_genworkerId];
  
  console.log('=== getProjectConfigThunk ===')
  console.log('Project Name:', projectName);
  console.log('Storage Genworker ID:', storageGenworkerId);
  
  const genworkerId = master_genworker ? `${master_genworker.ownerId}:${master_genworker.name}` : storageGenworkerId;
  webRTC.send(genworkerId, "GET_PROJECT_CONFIG", { projectName });
};