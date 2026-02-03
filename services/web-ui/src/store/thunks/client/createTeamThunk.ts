import { setLoading, setError, confirmEmail } from '@web-ui/store/slices/clientSlice';
import axios from 'axios';

import { services_config } from '@shared/services_config';
import { fetchClientThunk } from './fetchClientThunk';
import { workspaceSliceClear } from '@web-ui/store/slices/workspaceSlice';
import { flowsSliceClear } from '@web-ui/store/slices/flowsRepoSlice';
import { packagesSliceClear } from '@web-ui/store/slices/packagesSlice';
import { artifactsSliceClear } from '@web-ui/store/slices/artifactsSlice';
import { projectSliceClear } from '@web-ui/store/slices/projectsRepoSlice';
import { genworkersSliceClear } from '@web-ui/store/slices/genworkersRepoSlice';

export const createTeamThunk = (newTeamName: string) => async (dispatch: any, getState: any) => {
  console.log('=== createTeamThunk ===')

  try {
    const response = await axios.post(`${services_config.service_url.gateway_web_ui}/api/teams`, { name: newTeamName, description: ""});
    console.log('=== createTeamThunk response ===', response);

	dispatch(workspaceSliceClear());
	dispatch(flowsSliceClear());
	dispatch(packagesSliceClear());
	dispatch(artifactsSliceClear());
	dispatch(projectSliceClear());
	dispatch(genworkersSliceClear());
	
	dispatch(fetchClientThunk()); 

  } catch (err:any) {
    console.error("Error during createTeamThunk:", err);
  } 
};