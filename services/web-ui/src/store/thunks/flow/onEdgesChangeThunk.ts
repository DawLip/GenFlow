import { onEdgesChange } from "@web-ui/store/slices/flowsRepoSlice";

export const onEdgesChangeThunk = (data:any, flowName,  webRTC: any) => (dispatch: any, getState: any) => {
  const state = getState();

  // const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  dispatch(onEdgesChange(data));
  webRTC.sendToMaster("FLOW_UPDATE", {
    context: 'onEdgesChange',
    projectName,
    flowName,
    data
  })
  // socket.emit('flow_update',{
  //   context: 'onEdgesChange',
  //   projectId: state.project.projectId,
  //   flowName: state.flows[state.session.selectedFlow].name,
  //   path: state.flows[state.session.selectedFlow].path,
  //   data, 
  // })
};