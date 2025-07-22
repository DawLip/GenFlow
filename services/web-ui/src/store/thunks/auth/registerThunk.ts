import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { services_config } from '@shared/services_config';

export const registerThunk = (
  { email, username, password, rPassword }:{ 
    email:string, 
    username: string, 
    password: string, 
    rPassword: string
  }) => async (dispatch:any) => {
  console.log('=== User attempts to register ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const {data} = await axios.post(`${services_config.service_url.gateway_web_ui}/api/auth/register`, {
      username,
      email,
      password,
    });

    if (data.res.ok) {
      console.log("Register successful", data);
      dispatch(login({token: data.accessToken, userId: data.userId}));

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      Cookies.set('token', data.accessToken, { expires: 36500 });
      Cookies.set('userId', data.userId, { expires: 36500 });
    } else {
      console.error("Register failed:", data.res.msg);
      dispatch(setError(data.res.msg));
    }
  } catch (err:any) {
    console.error("Error during register:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)) }; 
};