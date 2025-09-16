

export const selectFlowThunk = (webRTC, flowName: string) => async (dispatch: any, getState: any) => {
  const storageGenworkerId = getState().projectRepo.projects.filter((p:any)=>p.name===getState().projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = getState().projectRepo.selectedProject;

  console.log('=== selectFlowThunk ===')
  console.log('Project Name:', projectName);
  console.log('Storage Genworker ID:', storageGenworkerId);

  webRTC.send(storageGenworkerId, "GET_FLOW_CONFIG", { projectName, flowName, flowData: true });
};