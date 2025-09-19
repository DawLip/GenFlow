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

  // const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/enqueue-task`, {
  //   projectId: state.project.projectId,
  //   flowName: state.flows[state.session.selectedFlow].name,
  //   path: state.flows[state.session.selectedFlow].path,
  //   data: {
  //     nodes: state.flows[state.session.selectedFlow].nodes,
  //     edges: state.flows[state.session.selectedFlow].edges
  //   }
  // });
  // console.log('executeFlowThunk', data, {
  //   projectId: state.project.projectId,
  //   flowName: state.flows[state.session.selectedFlow].name,
  //   path: state.flows[state.session.selectedFlow].path,
  //   data: {
  //     nodes: state.flows[state.session.selectedFlow].nodes,
  //     edges: state.flows[state.session.selectedFlow].edges
  //   }
  // })
};
