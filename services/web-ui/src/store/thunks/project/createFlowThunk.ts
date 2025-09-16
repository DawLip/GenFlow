import axios from 'axios';


import { defaultFlow } from '@web-ui/store/flow.default';
import { setFlow } from '@web-ui/store/slices/flowsRepoSlice';
import { addToFlowList } from '@web-ui/store/slices/projectsRepoSlice';

export const createFlowThunk = (webRTC) => async (dispatch: any, getState: any) => {
  console.log('=== createFlow ===')
  const state = getState();

  const storageGenworkerId = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0]?.genworkerStorageId;
  const projectName = state.projectRepo.selectedProject;
  const flows = state.projectRepo.projects.filter((p:any)=>p.name===state.projectRepo.selectedProject)[0].flows;

  let flowName = 'New Flow';
  console.log('Existing flows:', flows);
  while (Object.values(flows).some((flow: any) => flow === flowName)) flowName = 'New ' + flowName;

  const newFlow = {
    ...defaultFlow,
    name: flowName,
    projectName: projectName,
    description: " ",
    type: "FLOW", 
  }

  webRTC.send(storageGenworkerId, "CREATE_FLOW", newFlow);
  
  dispatch(setFlow(newFlow));
  dispatch(addToFlowList({projectName, flowName}));
};