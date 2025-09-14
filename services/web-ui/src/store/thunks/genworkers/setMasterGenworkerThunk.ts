import { services_config } from "@libs/shared/src/services_config";
import { setMasterGenworker } from "@web-ui/store/slices/teamSlice";
import axios from "axios";


export const setMasterGenworkerThunk = (genworker) => async (dispatch: any, getState: any) => {
  console.log('=== setMasterGenworkerThunk ===')
  const state = getState();
  const payload = {
    teamId: state.team.teamId,
    genworkerId: genworker.id
  }

  const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-team-set-master`,payload);
  dispatch(setMasterGenworker(payload));

  console.log("setMasterGenworkerThunk:", data);
};