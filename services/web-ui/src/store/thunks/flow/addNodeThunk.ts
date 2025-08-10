import { addNode } from "@web-ui/store/slices/flowsSlice";

export const addNodeThunk = (data:any, socket: any) => async (dispatch: any, getState: any) => {
  const state = getState();
  console.log('=== addNodeThunk ===');
  console.log('=== addNodeThunk ===', data.node);
  dispatch(addNode(data));
  socket.emit('flow_update',{
    context: 'addNode',
    projectId: state.project.projectId,
    flowName: state.flows[state.session.selectedFlow].name,
    data: JSON.parse(JSON.stringify(data.node)),
  })
};