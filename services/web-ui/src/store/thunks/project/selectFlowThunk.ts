import { selectFlow } from "@web-ui/store/slices/sessionSlice";
import { newTab } from "@web-ui/store/slices/workspaceSlice";


export const selectFlowThunk = (webRTC, flowName: string) => async (dispatch: any, getState: any) => {
  const state = getState()
  const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;

  console.log('=== selectFlowThunk ===')
  console.log('Project Name:', projectName);
  console.log('Storage Genworker ID:', storageGenworkerId);

  webRTC.send(storageGenworkerId, "GET_FLOW_CONFIG", { projectName, flowName, flowData: true });

  dispatch(selectFlow(state.flowsRepo.flows.length));
  dispatch(newTab({ title: flowName, type: 'flow', data: { projectName, flowName }}));
};