export const featchNodesThunk = (webRTC: any) => async (dispatch: any, getState: any) => {
  const state = getState();

  // const storageGenworkerId = getState().projectRepo.projects.filter((p:any)=>p.name===getState().projectRepo.selectedProject)[0]?.genworkerStorageId;
  const selectedTab = state.workspace.tabs[state.workspace.openedTab].data;
  console.log("selectedTab:", selectedTab)
  const flow = state.flowsRepo.flows.find((f:any) => f.name === selectedTab.flowName && f.projectName === selectedTab.projectName);
  console.log("flow:", flow)

  webRTC.sendToMaster("GET_PACKAGE_NODES", {})
};