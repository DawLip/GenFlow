import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { client } from '@web-ui/utils/apollo-client';
import Cookies from 'js-cookie';
import axios from 'axios';

import { services_config } from '@shared/services_config';
import { setClient } from '@web-ui/store/slices/clientSlice';

export const fetchClientThunk = () => async (dispatch: any, getState: any) => {
  console.log('=== fetchClient ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const state = getState();
    const {data} = await axios.get(`${services_config.service_url.gateway_web_ui}/api/users/${state.auth.userId}`, {headers: {Authorization: `Bearer ${state.auth.token}`}});
    if(data.res.ok) {
      console.log("FetchClient successful:", data.user);
      dispatch(setClient({...data.user, userId: data.user.id}));
    } else {
      console.error("FetchClient failed:", data);
      dispatch(setError(data.res.msg));
    }
  } catch (err:any) {
    console.error("Error during fetchClient:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)); }; 
};