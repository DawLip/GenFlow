

export const getProjectConfigThunk = (webRTC, projectName: string, storageGenworkerId: string) => async (dispatch: any, getState: any) => {
  console.log('=== getProjectConfigThunk ===')
  console.log('Project Name:', projectName);
  console.log('Storage Genworker ID:', storageGenworkerId);
  
  webRTC.send(storageGenworkerId, "GET_PROJECT_CONFIG", { projectName });
};