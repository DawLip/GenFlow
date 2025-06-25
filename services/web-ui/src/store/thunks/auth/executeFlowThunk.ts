import { login, setLoading, setError } from '@web-ui/store/slices/authSlice';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { client } from '@web-ui/utils/apollo-client';

export const executeFlowThunk = (nodes: any, edges: any, token: string) => async (dispatch: any) => {
  console.log('=== executeFlowThunk ===');
  console.log(token)

  try {
    const { data } = await client.mutate({
      mutation: EXECUTE_FLOW,
      variables: { input: { nodes, edges } },
      context: {
        headers: {
          authorization: token ? `${token}` : "",
        }
      }
    });

    if (data.executeFlow.status === "SUCCESS") {
      console.log("Send successful");
    } else {
      console.error("Failed:", data.executeFlow.status);
    }
  } catch (err) {
    console.error("Error during send:", err);
  }
};

const EXECUTE_FLOW = gql`
  mutation executeFlow($input: ExecuteFlowInput!) {
    executeFlow(input: $input) {
      status
    }
  }
`;
