import { logout, authSliceClear } from '@web-ui/store/slices/authSlice';

import { clientSliceClear } from '@web-ui/store/slices/clientSlice';
import { flowsSliceClear } from '@web-ui/store/slices/flowsRepoSlice';
import { teamSliceClear } from '@web-ui/store/slices/teamSlice';
import { projectSliceClear } from '@web-ui/store/slices/projectsRepoSlice';


export const logoutThunk = () => async (dispatch:any) => {
  console.log('=== User attempts to logout ===')

  dispatch(logout());

  dispatch(authSliceClear()); 
  dispatch(clientSliceClear());
  dispatch(flowsSliceClear());
  dispatch(projectSliceClear());
  dispatch(teamSliceClear());
};