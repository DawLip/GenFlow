import { setLoading, setError, confirmEmail } from '@web-ui/store/slices/clientSlice';
import axios from 'axios';

import { services_config } from '@shared/services_config';

export const verifyEmailThunk = ({verificationCode}:{verificationCode:string}) => async (dispatch: any, getState: any) => {
  console.log('=== verifyEmailThunk ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const response = await axios.post(`${services_config.service_url.gateway_web_ui}/api/auth/verify-email`, {verificationCode: verificationCode});
    console.log('=== verifyEmailThunk response ===', response);

    if (response.data.res.ok || response.data.res.msg === "email already verified") dispatch(confirmEmail({}));
    else dispatch(setError(response.data.res.msg));
  } catch (err:any) {
    console.error("Error during verifyEmailThunk:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)); }; 
};