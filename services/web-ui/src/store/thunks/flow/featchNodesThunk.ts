export const featchNodesThunk = (socket: any) => async (dispatch: any, getState: any) => {
  const state = getState();
  
  socket.emit('genworker_get_nodes',{
    userId: state.auth.userId,
    projectId: state.project.projectId,
    flowName: state.flows[state.session.selectedFlow].name,
    flowPath: state.flows[state.session.selectedFlow].path,
  })
};