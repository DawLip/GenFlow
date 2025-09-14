import { services_config } from "@libs/shared/src/services_config";
import axios from "axios";

export const removeGenworkerFromTeamThunk = (genworker) => async (dispatch: any, getState: any) => {
  console.log('=== RemoveGenworkerFromTeamThunk ===')
  const state = getState();
  const payload = {
    teamId: state.team.teamId,
    genworkerId: genworker.id
  }
  
  const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker-remove-from-team`,payload);
  dispatch({type: 'team/removeGenworkerFromTeam', payload});

  console.log("RemoveGenworkerFromTeamThunk:", data);
};