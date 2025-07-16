import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { client } from '@web-ui/utils/apollo-client';
import Cookies from 'js-cookie';
import axios from 'axios';


export const loginThunk = ({ email, password }:{ 
  email:string, 
  password: string,
}) => async (dispatch:any) => {
  console.log('=== User attempts to login ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const {data} = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });

    if(data.res.ok) {
      console.log("Login successful");
      
      dispatch(login({token: data.accessToken, userId: data.userId}));

      Cookies.set('token', data.accessToken, { expires: 36500 });
      Cookies.set('userId', data.userId, { expires: 36500 });
    }
    else {
      console.error("Login failed:", data.res.msg);
      dispatch(setError(data.res.msg));
    }
    
  } catch (err:any) {
    console.error("Error during login:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)); }; 
};