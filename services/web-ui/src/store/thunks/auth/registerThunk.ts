import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import { gql } from '@apollo/client';
import { client } from '@web-ui/utils/apollo-client';

export const registerThunk = (
  { email, name, surname, password, rPassword }:{ 
    email:string, 
    name: string, 
    surname: string,
    password: string, 
    rPassword: string
  }) => async (dispatch:any) => {
  console.log('=== User attempts to register ===')

  dispatch(setLoading(true)); 
  dispatch(setError(null)); 

  try {
    const { data } = await client.mutate({
      mutation: REGISTER,
      variables: { email, name, surname, password },
    });

    if (data.register.status=="SUCCESS") {
      console.log("Register successful");
      dispatch(login({token: data.register.access_token, userId: data.register.user._id}));
    } else {
      console.error("Register failed:", data.register.status);
      dispatch(setError(data.register.status));
    }
  } catch (err:any) {
    console.error("Error during register:", err);
    dispatch(setError(err.message));
  } finally { dispatch(setLoading(false)) }; 
};

const REGISTER = gql`
  mutation register($email: String!, $name: String!, $surname: String! $password: String!) {
    register(
      input: { name: $name, surname: $surname, email: $email, password: $password }
    ) {
      status,
      access_token,
      user{
        _id
        name
        surname
        email
      }
    }
  }
`;