import axios from 'axios';
import { services_config } from '@libs/shared/src/services_config';

export const executeFlowThunk = (webRTC, nodeId) => async (dispatch: any, getState: any) => {
  const state = getState();

  const selectedFlow = state.workspace.tabs[state.workspace.openedTab]?.data;

  console.log('=== executeFlowThunk ===', nodeId);

  webRTC.sendToMaster("EXECUTE_FLOW",{
    projectName: selectedFlow.projectName,
    flowName: selectedFlow.flowName,
    nodeId
  })
};
