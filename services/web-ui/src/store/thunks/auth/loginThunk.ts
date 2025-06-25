import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { client } from '@web-ui/utils/apollo-client';
import Cookies from 'js-cookie';

export const loginThunk = ({ email, password }:{ 
  email:string, 
  password: string,
}) => async (dispatch:any) => {
  console.log('=== User attempts to login ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: { email, password },
    });

    if(data.login.status=="SUCCESS") {
      console.log("Login successful");
      
      dispatch(login({token: data.login.access_token, userId: data.login.user._id}));

      Cookies.set('token', data.login.access_token, { expires: 36500 });
      Cookies.set('userId', data.login.user._id, { expires: 36500 });
    }
    else {
      console.error("Login failed:", data.login.status);
      dispatch(setError(data.login.status));
    }
    
  } catch (err:any) {
    console.error("Error during login:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)); }; 
};

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      status
      user {
        _id
      }
      access_token
    }
  }
`;