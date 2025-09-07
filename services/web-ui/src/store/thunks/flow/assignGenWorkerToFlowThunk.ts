import { services_config } from "@libs/shared/src/services_config";
import axios from "axios";

export const assignGenWorkerToFlowThunk = (data:any) => async (dispatch: any, getState: any) => {
  const state = getState();

  console.log('assignGenWorkerToFlow', data)
    const x = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-assign-to-flow`, {
      genworkerId: `${data.genworker.ownerId}:${data.genworker.name}`,
      projectId: state.project.projectId,
      flowName: data.selectedFlow?.name,
      path: data.selectedFlow?.path+'/'
    });
    console.log(x)
};