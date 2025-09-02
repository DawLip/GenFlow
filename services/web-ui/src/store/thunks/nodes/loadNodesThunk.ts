import { setLoading, setError, confirmEmail } from '@web-ui/store/slices/clientSlice';
import axios from 'axios';

import { services_config } from '@shared/services_config';
import { setNodes } from '@web-ui/store/slices/nodesSlice';

export const loadNodesThunk = () => async (dispatch: any, getState: any) => {
  console.log('=== loadNodesThunk ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const response = await axios.get(`${services_config.service_url.gateway_web_ui}/api/nodes`);
    console.log('=== loadNodesThunk response ===', response);

    if (response.data.res.ok) {
      dispatch(setNodes(response.data.res.data));
    } else {
      dispatch(setError(response.data.res.msg));
    }
  } catch (err:any) {
    console.error("Error during loadNodesThunk:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)); }; 
};