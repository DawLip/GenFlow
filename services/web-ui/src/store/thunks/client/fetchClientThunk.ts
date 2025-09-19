import axios from 'axios';

import { services_config } from '@shared/services_config';
import { setClient, setLoading as setLoadingClient, setError as setErrorClient } from '@web-ui/store/slices/clientSlice';
import { setTeam, setLoading as setLoadingTeams, setError as setErrorTeams } from '@web-ui/store/slices/teamSlice';
import { setProject, setLoading as setLoadingProject, setError as setErrorProject } from '@web-ui/store/slices/projectSlice';
import { setFlow } from '@web-ui/store/slices/flowsSlice';
import { newGenworker } from '@web-ui/store/slices/genworkersRepoSlice';

export const fetchClientThunk = () => async (dispatch: any, getState: any) => {
  console.log('=== fetchClient ===')

  dispatch(setLoadingClient(true));
  dispatch(setLoadingTeams(true));
  dispatch(setLoadingProject(true));
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

    dispatch(setClient({...data.user, userId: data.user.id}));

    const team = data.user.teams.filter((team: any) => team.name === 'Private');
    if (!team.length) {
      console.error("Private team not found for user:", data.user.id);
      dispatch(setErrorTeams("Private team not found"));
      return;
    }
    dispatch(setTeam({...team[0], teamId: team[0].id}));

    for (const genworker of [...new Set([team[0].masterGenworker, ...team[0].storageGenworkers])]) {
      const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/task-queue/genworker/${genworker}`);
      console.log("Fetched genworker data:", data);
      dispatch(newGenworker(data.genworker));
    }

    // const project = await axios.get(`${services_config.service_url.gateway_web_ui}/api/projects/${team[0].projects[0]}`);
    // if (!project.data.res.ok) {
    //   console.error("Project not found for user:", data.user.id);
    //   dispatch(setErrorProject("Project not found"));
    //   return;
    // }
    // dispatch(setProject({...project.data.project, projectId: project.data.project.id}));
      
  } catch (err:any) {
    console.error("Error during fetchClient:", err);
    dispatch(setErrorClient(err.message));
  } finally { dispatch(setLoadingClient(false)); dispatch(setLoadingTeams(false)); dispatch(setLoadingProject(false)); };
};