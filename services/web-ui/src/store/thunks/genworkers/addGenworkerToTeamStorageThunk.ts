import { services_config } from "@libs/shared/src/services_config";
import { addGenworkerToTeamStorage } from "@web-ui/store/slices/teamSlice";
import axios from "axios";


export const addGenworkerToTeamStorageThunk = (genworker) => async (dispatch: any, getState: any) => {
  console.log('=== addGenworkerToTeamStorageThunk ===')
  const state = getState();
  const payload = {
    teamId: state.team.teamId,
    genworkerId: genworker.id
  }

  const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-team-add-storage`,payload);
  dispatch(addGenworkerToTeamStorage(payload));

  console.log("addGenworkerToTeamStorageThunk:", data);
};