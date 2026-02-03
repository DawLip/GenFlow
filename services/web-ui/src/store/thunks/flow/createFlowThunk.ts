import axios from 'axios';

import { services_config } from '@shared/services_config';
// import { newFlow } from '@web-ui/store/slices/projectSlice';
import { defaultFlow } from '@web-ui/store/flow.default';

export const createFlowThunk = (name: string, path: string) => async (dispatch: any, getState: any) => {
  const state = getState();
  console.log('=== createFlow ===')
  
  // while (Object.values(state.project.flows).some((flow: any) => flow.name === name)) name = 'New ' + name;

  // try {
  //   const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/projects/${state.project.projectId}/flows/`,{
  //     id: state.project.projectId,
  //     flow: {
  //       ...defaultFlow,
  //       name: name,
  //       path: path,
  //       description: " ",
  //       type: "FLOW",
  //     }
  //   });
  //   if(!data.res.ok) {
  //     console.error("Error fetching client data:", data.res.error);
  //     return;
  //   }
  //   console.log("CreateFlow successful:", data.flow);
  //   // dispatch(newFlow({flowID: state.project.projectId + ':' + path + name, ...data.flow}));
  // } catch (err:any) {
  //   console.error("Error during createFlow:", err);
  // } 
};