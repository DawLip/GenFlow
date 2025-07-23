import axios from 'axios';

import { services_config } from '@shared/services_config';
import { setClient, setLoading as setLoadingClient, setError as setErrorClient } from '@web-ui/store/slices/clientSlice';
import { setTeam, setLoading as setLoadingTeams, setError as setErrorTeams } from '@web-ui/store/slices/teamSlice';

export const fetchClientThunk = () => async (dispatch: any, getState: any) => {
  console.log('=== fetchClient ===')

  dispatch(setLoadingClient(true));
  dispatch(setLoadingTeams(true));
  dispatch(setErrorClient(null));

  try {
    const state = getState();
    const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/users/${state.auth.userId}?populateTeams=1`);
    if(data.res.ok) {
      console.log("FetchClient successful:", data.user);

      dispatch(setClient({...data.user, userId: data.user.id}));

      const team = data.user.teams.filter((team: any) => team.name === 'Private');
      if (!team.length) {
        console.error("Private team not found for user:", data.user.id);
        dispatch(setErrorTeams("Private team not found"));
        return;
      }
      dispatch(setTeam({...team[0], teamId: team[0].id}));
    } else {
      console.error("FetchClient failed:", data);
      dispatch(setErrorClient(data.res.msg));
    }
  } catch (err:any) {
    console.error("Error during fetchClient:", err);
    dispatch(setErrorClient(err.message));
  } finally { dispatch(setLoadingClient(false)); dispatch(setLoadingTeams(false)); }; 
};