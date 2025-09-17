import { addNode } from "@web-ui/store/slices/flowsRepoSlice";

export const addNodeThunk = (data:any, socket: any) => async (dispatch: any, getState: any) => {
  const state = getState();
  console.log('=== addNodeThunk ===');
  console.log('=== addNodeThunk ===', data.node);
  const d= structuredClone(data);
  d.node.data.inputs.forEach(input => {
    input.value = input.default;
  });
  dispatch(addNode(d));
  // socket.emit('flow_update',{
  //   context: 'addNode',
  //   projectId: state.project.projectId,
  //   flowName: state.flows[state.session.selectedFlow].name,
  //   path: state.flows[state.session.selectedFlow].path,
  //   data: JSON.parse(JSON.stringify(d.node)),
  // })
};