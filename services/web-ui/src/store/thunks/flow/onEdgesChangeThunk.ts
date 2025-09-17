import { onEdgesChange } from "@web-ui/store/slices/flowsSlice";

export const onEdgesChangeThunk = (data:any, webRTC: any) => async (dispatch: any, getState: any) => {
  console.log('onEdgesChangeThunk')
  const state = getState();

  dispatch(onEdgesChange(data));
  webRTC.send("FLOW_UPDATE", {
    context: 'onEdgesChange',
    projectName: state.project.projectName,
    flowName: state.flowsRepo.flows[state.session.selectedFlow].name,
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