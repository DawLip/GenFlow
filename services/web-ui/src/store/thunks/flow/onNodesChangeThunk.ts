import { onNodesChange } from "@web-ui/store/slices/flowsSlice";

export const onNodesChangeThunk = (data:any, socket: any) => async (dispatch: any, getState: any) => {
  const state = getState();

  dispatch(onNodesChange(data));
  socket.emit('flow_update',{
    context: 'onNodesChange',
    projectId: state.project.projectId,
    flowName: state.flows[state.session.selectedFlow].name,
    path: state.flows[state.session.selectedFlow].path,
    data, 
  })
};