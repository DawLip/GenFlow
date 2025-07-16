import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import { gql } from '@apollo/client';
import { client } from '@web-ui/utils/apollo-client';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    const {data} = await axios.post('http://localhost:3000/api/auth/register', {
      username,
      email,
      password,
    });

    if (data.res.ok) {
      console.log("Register successful", data);
      dispatch(login({token: data.accessToken, userId: data.userId}));

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