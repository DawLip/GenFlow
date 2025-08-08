import { onEdgesChange } from "@web-ui/store/slices/flowsSlice";

export const onEdgesChangeThunk = (data:any, socket: any) => async (dispatch: any, getState: any) => {
  console.log('onEdgesChangeThunk')
  const state = getState();

  dispatch(onEdgesChange(data));
  socket.emit('flow_update',{
    context: 'onEdgesChange',
    projectId: state.project.projectId,
    flowName: state.flows[state.session.selectedFlow].name,
    data, 
  })
};