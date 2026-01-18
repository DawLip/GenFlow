import { onNodesChange } from "@web-ui/store/slices/flowsRepoSlice";
import { selectFlow } from "@web-ui/store/slices/sessionSlice";
import { newTab, setSelection } from "@web-ui/store/slices/workspaceSlice";


export const selectFlowThunk = (webRTC, flowName: string) => async (dispatch: any, getState: any) => {
  const state = getState();
  const master_genworkerId = state.team.masterGenworker;
  const master_genworker = state.genworkersRepo.genworkers[master_genworkerId];

  const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  console.log('=== selectFlowThunk ===')
  console.log('Project Name:', projectName);
  console.log('Storage Genworker ID:', storageGenworkerId);

  const genworkerId = master_genworker ? `${master_genworker.ownerId}:${master_genworker.name}` : storageGenworkerId;
  webRTC.send(genworkerId, "GET_FLOW_CONFIG", { projectName, flowName, flowData: true });

  dispatch(setSelection({ selectedNodes: [], selectedEdges: [] }));
  dispatch(selectFlow(state.flowsRepo.flows.length));
  dispatch(newTab({ title: flowName, type: 'flow', data: { projectName, flowName }}));
};