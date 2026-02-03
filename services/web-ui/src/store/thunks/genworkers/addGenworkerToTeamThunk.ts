import { services_config } from "@libs/shared/src/services_config";
import { addGenworkerToTeam } from "@web-ui/store/slices/teamSlice";
import axios from "axios";


export const addGenworkerToTeamThunk = (genworker) => async (dispatch: any, getState: any) => {
  console.log('=== AddGenworkerToTeamThunk ===')
  const state = getState();
  const payload = {
    teamId: state.team.teamId,
    genworkerId: genworker.id
  }

  const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-assign-to-team`,payload);
  dispatch(addGenworkerToTeam(payload));

  console.log("AddGenworkerToTeamThunk:", data);
};