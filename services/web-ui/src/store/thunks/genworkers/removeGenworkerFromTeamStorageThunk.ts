import { services_config } from "@libs/shared/src/services_config";
import { removeGenworkerFromTeamStorage } from "@web-ui/store/slices/teamSlice";
import axios from "axios";


export const removeGenworkerFromTeamStorageThunk = (genworker) => async (dispatch: any, getState: any) => {
  console.log('=== removeGenworkerFromTeamStorageThunk ===')
  const state = getState();
  const payload = {
    teamId: state.team.teamId,
    genworkerId: genworker.id
  }
  const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-team-remove-storage`,payload);
  dispatch(removeGenworkerFromTeamStorage(payload));


  console.log("removeGenworkerFromTeamStorageThunk:", data, genworker.id);
};