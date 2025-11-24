import axios from 'axios';

import { services_config } from '@shared/services_config';
import { setClient, setLoading as setLoadingClient, setError as setErrorClient } from '@web-ui/store/slices/clientSlice';
import { setTeam, setLoading as setLoadingTeams, setError as setErrorTeams } from '@web-ui/store/slices/teamSlice';
import { genworkersSliceClear, newGenworker } from '@web-ui/store/slices/genworkersRepoSlice';
import { projectSliceClear } from '@web-ui/store/slices/projectsRepoSlice';
import { artifactsSliceClear } from '@web-ui/store/slices/artifactsSlice';
import { packagesSliceClear } from '@web-ui/store/slices/packagesSlice';
import { flowsSliceClear } from '@web-ui/store/slices/flowsRepoSlice';
import { workspaceSliceClear } from '@web-ui/store/slices/workspaceSlice';

export const fetchClientThunk = () => async (dispatch: any, getState: any) => {
  console.log('=== fetchClient ===')

  dispatch(setLoadingClient(true));
  dispatch(setLoadingTeams(true));
  dispatch(setErrorClient(null));

  try {
    const state = getState();
    const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/users/${state.auth.userId}?populateTeams=1`);
    if(!data.res.ok) {
      console.error("Error fetching client data:", data.res.error);
      dispatch(setErrorClient(data.res.error));
      return;
    }
    console.log("FetchClient successful:", data.user);

    dispatch(handleFetchClientThunk(data, 'Private'));
      
  } catch (err:any) {
    console.error("Error during fetchClient:", err);
    dispatch(setErrorClient(err.message));
  } finally { dispatch(setLoadingClient(false)); dispatch(setLoadingTeams(false)); };
};


export const handleFetchClientThunk =  (data, teamName, reset?: boolean) => async (dispatch: any, getState: any) => {
    if (reset) {
      dispatch(workspaceSliceClear());
        dispatch(flowsSliceClear());
        dispatch(packagesSliceClear());
        dispatch(artifactsSliceClear());
        dispatch(projectSliceClear());
        dispatch(genworkersSliceClear());
    }

  dispatch(setClient({...data.user, userId: data.user.id}));

    const team = data.user.teams.filter((team: any) => team.name === teamName);
    if (!team.length) {
      console.error("Private team not found for user:", data.user.id);
      dispatch(setErrorTeams("Private team not found"));
      return;
    }
    dispatch(setTeam({...team[0], teamId: team[0].id}));
    
    const teamGenworkers = team[0].genworkers || [];
    for (const genworker of [...new Set([team[0].masterGenworker, ...teamGenworkers])]) {
      const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker/${genworker}`);
      console.log("Fetched genworker data:", data);
      dispatch(newGenworker(data.genworker));
    }
}