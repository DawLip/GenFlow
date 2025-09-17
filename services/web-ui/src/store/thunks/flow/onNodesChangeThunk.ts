import { onNodesChange } from "@web-ui/store/slices/flowsRepoSlice";

export const onNodesChangeThunk = (data:any, flowName:string, webRTC: any) => async (dispatch: any, getState: any) => {
  const state = getState();

  const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  dispatch(onNodesChange(data));
  webRTC.send(storageGenworkerId, "FLOW_UPDATE", {
    context: 'onNodesChange',
    projectName,
    flowName,
    data
  })
  // socket.emit('flow_update',{
  //   context: 'onNodesChange',
  //   projectId: state.project.projectId,
  //   flowName: state.flows[state.session.selectedFlow].name,
  //   path: state.flows[state.session.selectedFlow].path,
  //   data, 
  // })
};