
import { setInputValue } from '@web-ui/store/slices/flowsRepoSlice';

export const setInputValueThunk = (webRTC: any, payload:any) => async (dispatch: any, getState: any) => {
  const state = getState();

  const projectName = state.projectRepo.selectedProject;
  const flowName = state.workspace.tabs[state.workspace.openedTab]?.data?.flowName;
  const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;


  dispatch(setInputValue({...payload, projectName, flowName}));
  webRTC.send(storageGenworkerId, "FLOW_UPDATE", {
    context: 'onValueChange',
    projectName,
    flowName,
    data: payload
  })
};