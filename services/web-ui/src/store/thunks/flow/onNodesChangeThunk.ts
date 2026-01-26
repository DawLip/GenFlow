import { onNodesChange } from "@web-ui/store/slices/flowsRepoSlice";
import { setSelection } from "@web-ui/store/slices/workspaceSlice";

export const onNodesChangeThunk = (data:any, flowName:string, webRTC: any) => async (dispatch: any, getState: any) => {
  const state = getState();

  // const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  if (data.changes.map((c:any)=>c.type).includes('remove')) {
    dispatch(setSelection({selectedNodes: [], selectedEdges: []}));
  }

  dispatch(onNodesChange(data));
  webRTC.sendToMaster("FLOW_UPDATE", {
    context: 'onNodesChange',
    projectName,
    flowName,
    data
  })
};