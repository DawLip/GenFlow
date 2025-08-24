import { onConnect } from "@web-ui/store/slices/flowsSlice";

export const onConnectThunk = (data:any, socket: any) => async (dispatch: any, getState: any) => {
  console.log('onConnect')
  const state = getState();

  dispatch(onConnect(data));
  socket.emit('flow_update',{
    context: 'onConnect',
    projectId: state.project.projectId,
    flowName: state.flows[state.session.selectedFlow].name,
    path: state.flows[state.session.selectedFlow].path,
    data, 
  })
};