import { onConnect } from "@web-ui/store/slices/flowsRepoSlice";

export const onConnectThunk = (data:any, flowName, webRTC: any) => (dispatch: any, getState: any) => {
  const state = getState();

  // const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  dispatch(onConnect(data));
  webRTC.sendToMaster("FLOW_UPDATE", {
    context: 'onConnect',
    projectName,
    flowName,
    data
  })
};