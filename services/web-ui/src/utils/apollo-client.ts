import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import config from '@web-ui/utils/config';

const client = new ApolloClient({
  uri: config.urls.graphql, 
  cache: new InMemoryCache(),
});

export { client };